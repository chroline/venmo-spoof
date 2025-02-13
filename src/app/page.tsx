"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Transaction from "./transaction";

export default function Home() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    description: "",
    price: "",
  });

  const [finished, setFinished] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    setFinished(true);
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!finished) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        {/* Header */}
        <header className="px-6 pt-8 pb-4 text-center">
          <h1 className="text-2xl font-medium tracking-tight">Venmo Spoofer</h1>
        </header>

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8 max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-lg">
                Venmo Username
              </Label>
              <Input
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="username"
                className="text-lg py-6"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-lg">
                Description
              </Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="What's this payment for?"
                className="text-lg py-6"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-lg">
                Price ($)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="text-lg py-6"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-xl py-6"
            >
              Generate Transaction
            </Button>
            <p className="text-center">
              made by cole gawin—saving YOU money, one niche function at a time
            </p>
          </form>
        </main>
      </div>
    );
  } else {
    return <Transaction {...formData} />;
  }
}
