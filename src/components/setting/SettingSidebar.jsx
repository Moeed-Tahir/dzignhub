"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Crown from "@/app/assets/crown";
import Edit from "@/app/assets/edit";
import Lock from "@/app/assets/lock";
import Notification from "@/app/assets/notification-status";
import Star from "@/app/assets/star";
import Image from "next/image";
const navItems = [
	{
		name: "Edit profile",
		href: "/setting/edit-profile",
		icon: (color) => <Edit color={color} />,
	},
	{
		name: "Password",
		href: "/setting/password",
		icon: (color) => <Lock color={color} />,
	},
	{
		name: "Notifications",
		href: "/setting/notifications",
		icon: (color) => <Notification color={color} />,
	},
	{
		name: "Sessions",
		href: "/setting/sessions",
		icon: (color) => <Star color={color} />,
	},
	{
		name: "Subscriptions",
		href: "/setting/subscriptions",
		icon: (color) => <Crown color={color} />,
	},
];

export default function SettingSidebar() {
	const pathname = usePathname();

	return (
		<aside className="w-[360px] py-[80px]  border-r-4 border-[#E3E9EE] min-h-[970px] bg-white">
			<div className="flex flex-col gap-[16px]">
				{navItems.map((item) => {
					const isActive = pathname === item.href;
					const iconColor = isActive ? "#1B1F3B" : "#68686B";
					return (
						<Link key={item.href} href={item.href}>
							<div
								className={`px-[32px] py-[14px] mx-[48px] rounded-full flex justify-start items-center gap-2 cursor-pointer transition ${
									isActive
										? " text-[#1B1F3B] border-[#C209C1] border font-medium text-[14px]"
										: " text-[#68686B] border border-[#E3E9EE] text-[14px] font-medium"
								}`}
							>
								{item.icon(iconColor)} {item.name}
							</div>
						</Link>
					);
				})}
				<Link
					href="/setting/delete-account"
					className="px-[48px] border-t-[#E3E9EE] border-t-2 "
				>
					<div className="px-[32px] py-[14px] mt-4  text-red-500 border border-[#E3E9EE] rounded-full text-start  transition font-medium">
						<Image
							src={"/setting/trash.svg"}
							alt="delete account"
							width={20}
							height={20}
							className="inline-block mr-2"
						/>
						Delete account
					</div>
				</Link>
			</div>
		</aside>
	);
}
