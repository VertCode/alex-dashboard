"use client";

import Image from "next/image";
import logo from "@/public/logo.png";
import React, {useState} from "react";
import {cn} from "@/utils/cn";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {BiChevronDown} from "react-icons/bi";

interface NavBarItem {

    name: string;

    href: string;

}

const NAV_BAR_ITEMS: NavBarItem[] = [
    {
        name: "Metrics",
        href: "/"
    },
    {
        name: "Money Manager",
        href: "/money-manager"
    },
    {
        name: "Master",
        href: "/master"
    },
    {
        name: "Settings",
        href: "/settings"
    }
];

export default function NavBar() {
    const [currentPath, setCurrentPath] = useState<string>("/");

    return (
        <nav
            className="flex px-5 md:px-[3rem] lg:px-[5rem] space-x-10 border-b-2 border-[rgba(255,255,255,.1)]">
            <div className="py-4">
                <Image
                    src={logo}
                    alt="Vanquish Capital Logo Long"
                    width={30}
                    height={30}
                />
            </div>
            <div className="flex items-center gap-8 text-md flex-1">
                {
                    NAV_BAR_ITEMS.map((navBarItem) => (
                        <Link
                            key={navBarItem.name}
                            href={navBarItem.href}
                            className={cn({
                                "relative flex items-center group h-full": true,
                            })}
                        >
                            {
                                navBarItem.name
                            }
                            <div
                                className={cn({
                                    "absolute left-0 right-0 top-0 h-[2px] w-[1rem] m-auto bg-[#5855D6] group-hover:opacity-100 opacity-0 transition-all duration-200": true,
                                    "opacity-100": currentPath === navBarItem.href
                                })}
                            />
                            <div
                                className={cn({
                                    "absolute left-1/2 top-0 h-[5rem] w-[5rem] group-hover:opacity-100 opacity-0 -translate-y-1/2 -translate-x-1/2 transition-all duration-200": true,
                                    "opacity-100": currentPath === navBarItem.href
                                })}
                                style={{
                                    background: "radial-gradient(50% 50% at 50% 50%,rgba(88, 85, 214,.13) 0,rgba(0,0,0,0) 100%)"
                                }}
                            />
                        </Link>
                    ))
                }
            </div>
            <div className="flex items-center gap-5 w-fit relative">
                <div>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className={""}>
                        <Button variant="ghost" className="gap-5">
                            <Avatar className="h-9 w-9 bg-white">
                                <AvatarImage src="https://github.com/vertcode.png" alt="Avatar"/>
                                <AvatarFallback>VCD</AvatarFallback>
                            </Avatar>
                            <div className="flex gap-2.5">
                                <div className="flex flex-col space-y-1">
                                    <h3 className="text-sm font-normal text-[rgba(255,255,255,.55)]">
                                        Hello,
                                        <span className="text-white">VertCode</span>
                                    </h3>
                                </div>
                                <BiChevronDown
                                    className="h-5 w-5 text-[rgba(255,255,255,.5)]"
                                />
                            </div>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            Signed in as
                            <span className="font-medium ml-1">VertCode</span>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                Profile
                                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Billing
                                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Settings
                                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            Log out
                            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </nav>
    )
}