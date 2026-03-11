import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function Layout() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto max-w-5xl px-6 pt-20 pb-10">
                <Outlet />
            </main>
        </div>
    );
}
