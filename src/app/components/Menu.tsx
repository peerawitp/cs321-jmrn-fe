"use client";
import Link from "next/link";

const MobileMenu = () => {
    return (
        <div className="lg:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                <Link href="/" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                    Home
                </Link>
                <Link href="/products" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                    Products
                </Link>
                <Link href="/cart" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                    Cart
                </Link>
                <Link href="/profile" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                    Profile
                </Link>
                <Link href="/auth" className="text-gray-700 hover:bg-gray-100 block px-3 py-2 rounded-md text-base font-medium">
                    Login | Register
                </Link>
            </div>
        </div>
    );
};

export default MobileMenu;
