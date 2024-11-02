"use client";

import { getAvatarURL, getName } from "@/lib/data-fetching";
import {
  ChevronLeft,
  Globe,
  Heart,
  MessageCircle,
  Building2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";

export default function Transaction() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");
  const description = searchParams.get("description");
  const price = searchParams.get("price");

  const [name, setName] = useState("");
  const [avatarURL, setAvatarURL] = useState("");

  useEffect(() => {
    getName(username).then((v) => setName(v));
    getAvatarURL(username).then((v) => setAvatarURL(v));
  }, [username]);

  const currentDate = format(new Date(), "MMMM dd, yyyy, h:mm a");
  const transactionID = Math.floor(Math.random() * 1e18)
    .toString()
    .padStart(18, "0");
  const accountEnding = Math.floor(1000 + Math.random() * 9000); // Random 4-digit number
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="mx-auto bg-white">
      {/* Header */}
      <div className="p-4 flex items-center sticky top-0 bg-white">
        <div className="flex items-center gap-4 w-full">
          <ChevronLeft className="w-6 h-6 text-gray-500 float-left" />
          <h1 className="font-normal absolute left-[50%] -translate-x-[50%] opacity-70">
            Payment details
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 flex flex-col items-center">
        {/* Profile Section */}
        {avatarURL ? (
          <img
            src={avatarURL}
            alt="Profile"
            className="w-12 h-12 rounded-full mb-1"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-lg mb-1 border text-gray-500 border-gray-300">
            {initials}
          </div>
        )}
        <h2 className="text-2xl font-medium mb-1">{name}</h2>
        <p className="text-gray-600 mb-2">"{description}"</p>
        <p className="text-red-500 text-2xl font-medium mb-6">-${price}</p>

        {/* Social Activity */}
        <div className="w-full mb-6">
          <h3 className="text-gray-600 mb-2 text-sm">Social Activity</h3>
          <div className="flex gap-6">
            <div className="flex items-center gap-2 text-gray-500">
              <Heart className="w-5 h-5" />
              <span>0</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <MessageCircle className="w-5 h-5" />
              <span>0</span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="w-full mb-6">
          <h3 className="text-gray-600 mb-2 text-sm">Status</h3>
          <p className="font-medium">Complete</p>
        </div>

        {/* Payment Method */}
        <div className="w-full mb-6">
          <h3 className="text-gray-600 mb-2 text-sm">Payment method</h3>
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6 text-gray-500" />
            <div>
              <p className="font-medium">U.S. BANK NATIONAL ASSOCIATION</p>
              <p>Personal Checking</p>
              <p className="text-gray-500">Bank •• {accountEnding}</p>
            </div>
          </div>
        </div>

        {/* Transaction Details */}
        <div className="w-full mb-6">
          <h3 className="text-gray-600 text-sm">Transaction details</h3>
          <div className="flex items-center gap-2">
            <p>{currentDate} • </p>
            <Globe className="w-4 h-4 text-blue-500" />
            <span className="text-blue-500 font-medium">Public</span>
          </div>
        </div>

        {/* Paid to */}
        <div className="w-full mb-6">
          <h3 className="text-gray-600 text-sm">Paid to</h3>
          <p>@{username}</p>
        </div>

        {/* Type of transaction */}
        <div className="w-full mb-6">
          <h3 className="text-gray-600 text-sm">Type of transaction</h3>
          <p>Payments between friends</p>
        </div>

        {/* Transaction ID */}
        <div className="w-full mb-6">
          <h3 className="text-gray-600 text-sm">Transaction ID</h3>
          <p className="break-all">{transactionID}</p>
        </div>

        {/* Need Help Link */}
        <a href="#" className="text-blue-500 w-full font-bold">
          Need help?
        </a>
      </div>
    </div>
  );
}
