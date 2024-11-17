"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Linkedin, Twitter, Globe, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import LeetcodeContext from "./context/leetcodeContext";
import { useToast } from "@/hooks/use-toast";

function SocialLink({ href, icon: Icon, label }: { href: string; icon: React.ElementType; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-purple-300 hover:text-orange-400 transition-colors duration-300"
      aria-label={label}
    >
      <Icon size={24} />
    </a>
  );
}

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const context = useContext(LeetcodeContext);
  if (context === undefined) {
    throw new Error("Context not correctly defined");
  }

  const { leetcodeData, setLeetcodeData, username, setUsername } = context;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const apiURL = `https://leetcode-stats-api.herokuapp.com/${username}`;

    if (username === "") {
      toast({
        title: "Please enter a username",
      });
      return;
    } else {
      setIsLoading(true);

      await fetch(apiURL)
        .then((data) => data.json())
        .then((data) => setLeetcodeData(data))
        .catch((error) =>
          toast({
            title: "Cannot find the user",
          })
        );

      router.push("/stats");

      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-950 via-purple-900 to-purple-950 p-4">
      <h1 className="text-5xl font-bold mb-8 text-orange-300">
        Leet <span className="text-purple-400">Cost</span>
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        <div className="space-y-2">
          <Input
            id="username"
            type="text"
            placeholder="Enter your leetcode username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-purple-900 border-purple-800 text-purple-100 placeholder-purple-400 focus:border-orange-400 focus:ring-orange-400 transition-all duration-300"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-purple-950 font-semibold transition-colors duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            <>
              View Profile
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </form>

      <div className="absolute bottom-5 flex justify-center items-center gap-x-4 gap-y-6 pb-8">
        <SocialLink
          href="https://www.linkedin.com/in/sameerposwal/"
          icon={Linkedin}
          label="LinkedIn Profile"
        />
        <SocialLink
          href="https://twitter.com/sameerposwal03"
          icon={Twitter}
          label="Twitter Profile"
        />
        <SocialLink
          href="https://sameerposwal.vercel.app/"
          icon={Globe}
          label="Portfolio Website"
        />
      </div>
    </div>
  );
}
