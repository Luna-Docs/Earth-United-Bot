import MS from "pretty-ms";

export = (Ms: number) => {
    const ms = MS(Ms, {verbose: true, secondsDecimalDigits: 0});

    // ms.years ? time += `${ms.years} year${ms.years > 1 ? 's' : ''} ` : ``;
    // ms.months ? time += `${ms.months} month${ms.months > 1 ? 's' : ''} ` : ``;
    // ms.weeks ? time += `${ms.weeks} week${ms.weeks > 1 ? 's' : ''} ` : ``;
    // ms.days ? time += `${ms.days} day${ms.days > 1 ? 's' : ''} ` : ``;
    // ms.hours ? time += `${ms.hours} hour${ms.hours > 1 ? 's' : ''} ` : ``;
    // ms.minutes ? time += `${ms.minutes} minute${ms.minutes > 1 ? 's' : ''} ` : ``;
    // ms.seconds ? time += `${ms.seconds} second${ms.seconds > 1 ? 's' : ''} ` : ``;

    // // Years
    // if (ms.years > 1) time += `${ms.years} years`;
    // else if (ms.years === 1) time += `1 year` 

    // // Months
    // else if (ms.months < 12 && ms.months >= 2) time += `${ms.months} months `;
    // else if (ms.months === 1) time += `1 month `;

    // // Weeks
    // else if (ms.weeks < 5 && ms.weeks >= 2) time += `${ms.weeks} weeks `;
    // else if (ms.weeks === 1) time += `1 week `;
    
    // // Days
    // else if (ms.days <= 7 && ms.days >= 2) time += `${ms.days} days `;
    // else if (ms.days === 1) time += `1 day `;

    // // Hours
    // else if (ms.hours < 24 && ms.hours >= 2) time += `${ms.hours} hours `;
    // else if (ms.hours === 1) time += `1 hour `;

    // // Minutes
    // else if (ms.minutes < 60 && ms.minutes >= 2) time += `${ms.minutes} minutes `;
    // else if (ms.minutes === 1) time += `1 minute `;

    // // Seconds
    // else if (ms.seconds < 60 && ms.seconds >= 2) time += `${ms.seconds} seconds`
    // else if (ms.seconds < 2) time += `${ms.seconds} seconds`;

    return ms;
}