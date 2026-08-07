import React from 'react';

type emojiName = "😀" | "🚨" | "💡";

interface InformationProps {
    type?: "positive" | "negative" | "normal";
    title?: string;
    subtext?: string;
    isMobile?: boolean;
}

const Information: React.FC<InformationProps> = ({
    type = "normal",
    title,
    subtext,
    isMobile = false
}) => {
    const emojiMap: Record<string, emojiName> = {
        positive: "😀",
        negative: "🚨",
        normal: "💡"
    };

    const bgColorMap: Record<string, string> = {
        positive: "bg-sky_bg",
        negative: "bg-red10",
        normal: "bg-bg_gray1"
    };

    const textColorMap: Record<string, string> = {
        positive: "text-sky",
        negative: "text-red",
        normal: "text-gray900"
    };

    const subtextColorMap: Record<string, string> = {
        positive: "text-sky",
        negative: "text-red",
        normal: "text-gray700"
    };

    const widthClass = isMobile ? "w-[335px]" : "w-[727px]";

    const emojiTextClass = isMobile ? "text-body2 font-semibold" : "text-subtitle3 font-medium";
    const titleTextClass = isMobile ? "text-body2 font-semibold" : "text-body1 font-medium";
    const subtextTextClass = isMobile ? "text-body2 font-semibold" : "text-body2 font-medium";

    return (
        <div className={`${widthClass} flex p-[20px] flex-col justify-center items-start gap-[8px] rounded-large ${bgColorMap[type]}`}>
            <div className="w-full flex items-center gap-[8px] self-stretch">
                <span className={emojiTextClass}>{emojiMap[type]}</span>
                {title && <span className={`flex flex-1 ${textColorMap[type]} ${titleTextClass}`}>{title}</span>}
            </div>
            {subtext && <span className={`flex flex-1 ${subtextColorMap[type]} ${subtextTextClass}`}>{subtext}</span>}
        </div>
    );
};

export default Information;