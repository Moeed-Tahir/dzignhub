import React from 'react';

const plans = [
	{
		label: 'For individuals',
		name: 'Free',
		price: 'Free',
		priceUnit: '/ month',
		features: [
			'Image Creation',
			'Video Creation',
			'allmyai',
			'allmyai',
			'allmyai',
		],
		button: 'Your current plan',
		buttonStyle: 'border border-[#E3E9EE] text-[#4B1C8C] bg-white',
		tag: 'Current plan',
		tagStyle: 'text-[#68686B] border border-[#68686B]',
		isCurrent: true,
	},
	{
		label: 'For professionals',
		name: 'Basic',
		price: '$25',
		priceUnit: '/ month',
		features: [
			'Brand Design',
			'Content Creation',
			'allmyai',
			'allmyai',
			'allmyai',
		],
		button: 'Upgrade',
		buttonStyle: 'bg-[#D0FF00] text-[#1B1F3B] hover:bg-[#b8e600]',
		tag: 'Popular',
		tagStyle: 'bg-[#FEE7FE] text-[#C209C1] font-semibold',
		isCurrent: false,
	},
];

const CheckIcon = (
	<svg width="20" height="20" fill="none" viewBox="0 0 20 20">
		<path d="M5 10.5l4 4 6-7" stroke="#232323" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
	</svg>
);

const page = () => {
	return (
		<div className="bg-white flex-1 min-h-screen px-[160px] py-[80px] flex flex-col items-start">
			<h1 className="text-[#1B1F3B] text-[34px] font-semibold mb-12">Subscriptions</h1>
			<div className="flex gap-[16px] w-full">
				{plans.map((plan, idx) => (
					<div
						key={plan.name}
						className="flex-1 rounded-[20px] border border-[#E3E9EE] bg-white p-10 flex flex-col min-w-[380px] max-w-[440px] shadow-sm"
					>
						<div className="flex items-center justify-between mb-2">
							<span className="text-[#68686B] text-[12px]">{plan.label}</span>
							<span className={`px-4 py-1 rounded-full  font-bold text-[12px] ${plan.tagStyle}`}>{plan.tag}</span>
						</div>
						<div className="text-[#2C2C2D] text-[18px] font-bold mb-2">{plan.name}</div>
						<div className="flex items-center gap-2 mb-8">
							<span className="text-[#2C2C2D] text-[32px] font-bold">{plan.price}</span>
							<span className="text-[#68686B] text-[16px] font-normal ">{plan.priceUnit}</span>
						</div>
						<hr className="border-[#E3E9EE] mb-8" />
						<ul className="flex flex-col gap-4 mb-10">
							{plan.features.map((feature, i) => (
								<li key={i} className="flex items-center gap-3 font-normal text-[#232323] text-[14px]">
									{CheckIcon} {feature}
								</li>
							))}
						</ul>
						<button
							className={`w-full rounded-full  text-[14px] py-[12px] font-medium transition ${plan.buttonStyle}`}
							disabled={plan.isCurrent}
						>
							{plan.button}
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default page;