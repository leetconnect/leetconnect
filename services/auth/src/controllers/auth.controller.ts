import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs'; // Using bcryptjs for easier Docker setup
import jwt from "jsonwebtoken";
import prisma from '../lib/prisma';


type AuthBody = {
    username?: unknown,
    email?:unknown,
    password?:unknown
}

function TrimAuthInput(body: AuthBody) {
  const username =
    typeof body.username === 'string'
      ? body.username.trim()
      : '';

  const email =
    typeof body.email === 'string'
      ? body.email.trim()
      : '';

  const password =
    typeof body.password === 'string'
      ? body.password
      : '';

  return { username, email, password };
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { username, email, password } = TrimAuthInput(req.body);

        // input Validation
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        // Check duplicates in Postgres
        // turn into lowercase to compare in db
        const normalizedEmail = email.toLowerCase();
        const normalizedUsername = username.toLowerCase();

        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: {
                            equals: normalizedEmail,
                            mode: 'insensitive',
                        },
                    },

                    {
                        username: {
                            equals: normalizedUsername,
                            mode: 'insensitive',
                        },
                    },
                ]
            }
        });

        if (existingUser) {
            return res.status(409).json({ 
                error: existingUser.email === email ? 'Email taken' : 'Username taken' 
            });
        }

        // Slow hash + salt
        // 12 rounds is the industry standard for slow hashing security
        const hashedPassword = await bcrypt.hash(password, 12);

        // Save to Database
        const newUser = await prisma.user.create({
            data: {
                // ive decided to store data as it is submitted 
                // but in login i will lowercase the data to compare that way User123@gmail.com is the same as user123@gmail.com
                username,
                email,     
                password: hashedPassword,
            },
            // Ensure we don't return the password string in the response
            select: {
                id: true,
                username: true,
                email: true,
                createdAt: true
            }
        });

        return res.status(201).json({
            message: `Welcome ${newUser.username} 🐱‍👓`,
            user: newUser
        });

    } catch (error) {
        next(error); // Sends error to the shared errorHandler
    }
};


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {email , password} = TrimAuthInput(req.body);
        
        if (!email || !password) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        // search for user by email
        const normalizedEmail = email.toLowerCase();
        const user = await prisma.user.findFirst({
            where: {
                email: {
                        equals: normalizedEmail,
                        mode: 'insensitive',
                    }
            },
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid username" });
        }

        // check correct password
        if (!user.password) { // need to add that user is using AOuth
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.status(401).json({ error: "Invalid Password" });
        }

        // generate jwt refresh or access ?
        const token = jwt.sign(
            { sub: user.id, email: user.email, username: user.username },
            process.env.JWT_SECRET as string,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            token,
            user: {
            id: user.id,
            email: user.email,
            username: user.username,
            createdAt: user.createdAt,
            },
        });
        
    } catch (error) {
        next(error); // Sends error to the shared errorHandler
    }
};