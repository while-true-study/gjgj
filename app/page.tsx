"use client";
import { redirect } from "next/navigation";
import BankSelector from "./components/BankSelector/BankSelector";

export default function LoginMain() {
  // redirect("/login/loginMain.html");
  return (
    <div>
      <BankSelector></BankSelector>
    </div>
  );
}
