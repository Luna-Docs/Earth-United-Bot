import ms from "parse-ms";

export = (ms: ms.Parsed) => {
    let time = ``;

    // Months
    if (ms.months > 1) time += `${ms.months} months `;
    else if (ms.months === 1) time += `1 month `;

    // Weeks
    else if (ms.weeks < 5 && ms.weeks > 1) time += `${ms.weeks} weeks `;
    else if (ms.weeks === 1) time += `1 week `;
    
    // Days
    else if (ms.days <= 7 && ms.days > 1) time += `${ms.days} days `;
    else if (ms.days === 1) time += `1 day `;

    // Hours
    else if (ms.hours < 24 && ms.hours > 1) time += `${ms.hours} hours `;
    else if (ms.hours === 1) time += `1 hour `;

    // Minutes
    else if (ms.minutes < 60 && ms.minutes > 1) time += `${ms.minutes} minutes `;
    else if (ms.minutes === 1) time += `1 minute `;

    // Seconds
}