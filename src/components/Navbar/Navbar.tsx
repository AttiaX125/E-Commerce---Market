"use client";

import * as React from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import logo from "../../assets/Logo.png";
import Image from "next/image";
import {
  Boxes,
  Cog,
  Heart,
  House,
  ShoppingCart,
  Store,
  UserPlus,
  BadgeCheckIcon,
  LogOutIcon,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
export default function Navbar() {
  const { data } = useSession();

  async function handleLogOut() {
    await signOut({ redirectTo: "/register" });
  }

  return (
    <nav className="sticky top-0 z-50 px-6 -mb-24">
      {/* 🔥 GLASS CONTAINER */}
      <div className="mx-auto ">
        <div
          className="
          relative flex items-center justify-between
          px-6 py-3 rounded-3xl
          backdrop-blur-xl bg-white/10
          border border-white/20
          shadow-[0_8px_32px_rgba(0,0,0,0.1)]
        "
        >
          {/* ✨ LIGHT GLOW */}
          <div className="absolute inset-0 rounded-3xl bg-linear-to-r from-[#c89b6d]/20 via-transparent to-[#a65322]/20 opacity-50 blur-xl pointer-events-none" />

          {/* LOGO */}
          <Link href="/" className="relative z-10">
            <Image src={logo} width={80} height={70} alt="logo" />
          </Link>

          {/* CENTER LINKS */}
          <NavigationMenu className="hidden md:flex relative z-10">
            <NavigationMenuList className="gap-2">
              <NavItem href="/" label="Home" />
              <NavItem href="/shop" label="Shop" />
              <NavItem href="/categories" label="Categories" />
              <NavItem href="/brands" label="Brands" />
            </NavigationMenuList>
          </NavigationMenu>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3 relative z-10">
            {/* WISHLIST */}
            <IconButton href="/wishlist">
              <Heart />
            </IconButton>

            {/* CART */}
            <IconButton href="/cart">
              <div className="relative">
                <ShoppingCart />
                <span className="absolute -top-2 -right-2 w-5 h-5 text-xs flex items-center justify-center bg-[#c89b6d] text-white rounded-full animate-pulse">
                  2
                </span>
              </div>
            </IconButton>

            {/* AUTH */}
            {data ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="rounded-full p-0 hover:bg-transparent"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-[#c89b6d]/30 blur-md opacity-0 hover:opacity-100 transition" />
                      <Avatar className="h-10 w-10 border border-white/40 shadow-md">
                        <AvatarImage src="https://github.com/github.png" />
                        <AvatarFallback className="bg-[#c89b6d] text-white">
                          LR
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="
      w-56 
      p-2 
      bg-white/30 
      backdrop-blur-xl 
      border border-white/40 
      shadow-xl 
      rounded-2xl
    "
                >
                  <DropdownMenuGroup className="space-y-1">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/setting"
                        className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/40 transition cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-[#c89b6d]/20 text-[#5a4030]">
                          <House size={16} />
                        </div>
                        <span className="text-[#5a4030] font-medium">Home</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href="/setting"
                        className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/40 transition cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-[#c89b6d]/20 text-[#5a4030]">
                          <Store size={16} />
                        </div>
                        <span className="text-[#5a4030] font-medium">Shop</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href="/setting"
                        className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/40 transition cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-[#c89b6d]/20 text-[#5a4030]">
                          <BadgeCheckIcon size={16} />
                        </div>
                        <span className="text-[#5a4030] font-medium">
                          Categury
                        </span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/setting"
                        className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/40 transition cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-[#c89b6d]/20 text-[#5a4030]">
                          <Boxes size={16} />
                        </div>
                        <span className="text-[#5a4030] font-medium">
                          Brands
                        </span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        href="/orders"
                        className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/40 transition cursor-pointer"
                      >
                        <div className="p-1.5 rounded-lg bg-[#c89b6d]/20 text-[#5a4030]">
                          <Boxes size={16} />
                        </div>
                        <span className="text-[#5a4030] font-medium">
                          My Orders
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>

                  <DropdownMenuSeparator className="my-2 bg-white/30" />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/setting"
                      className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-white/40 transition cursor-pointer"
                    >
                      <div className="p-1.5 rounded-lg bg-[#c89b6d]/20 text-[#5a4030]">
                        <Cog size={16} />
                      </div>
                      <span className="text-[#5a4030] font-medium">
                        Settings
                      </span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="my-2 bg-white/30" />

                  <DropdownMenuItem
                    onClick={handleLogOut}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-100/40 transition cursor-pointer"
                  >
                    <div className="p-1.5 rounded-lg bg-red-100 text-red-600">
                      <LogOutIcon size={16} />
                    </div>
                    <span className="text-red-600 font-medium">Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                href="/register"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/40 backdrop-blur-md hover:bg-white/60 transition"
              >
                <UserPlus size={18} /> Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavItem({ href, label }: { href: string; label: string }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="
            relative px-4 py-2 rounded-xl text-[#5a4030] font-medium
            transition-all duration-300

            hover:bg-white/40 hover:backdrop-blur-md
            hover:scale-105
          "
        >
          {label}

          {/* ✨ underline animation */}
          <span
            className="
            absolute left-1/2 -bottom-1 h-0.5 w-0 bg-[#a65322]
            transition-all duration-300
            group-hover:w-full group-hover:left-0
          "
          />
        </Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function IconButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="
        p-2 rounded-xl
        bg-white/30 backdrop-blur-md
        border border-white/40
        shadow-sm

        hover:bg-white/50
        hover:scale-110
        transition duration-300
      "
    >
      {children}
    </Link>
  );
}
