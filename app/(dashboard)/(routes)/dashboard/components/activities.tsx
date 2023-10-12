import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { BellRing } from "lucide-react";

const activities = [
    {
        activity: 'Assigned you to a task',
        title: 'Create a Draft',
        date: '2021-10-28',
    },
    {
        activity: 'Added you to a project',
        title: 'Project 303',
        date: '2021-08-16',
    },
];


const Activities = () => {
    return(
        <Card className="shadow-sm shadow-slate-400 w-1/3">
            <CardHeader className="px-5 pt-8 flex flex-row gap-4 items-center">
                <BellRing className="text-primary pt-1 h-7"/>
                <div>
                    <CardTitle className="text-base tracking-wide leading-tight">Activities</CardTitle>
                    <CardDescription className="text-xs">Recent activities from your projects</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 px-5 pb-8">
                <div>
                    {activities.map((activity) => (
                        <div className="flex flex-row justify-between py-4 px-2 border-b-2" key={activity.activity}>
                            <div>
                                <h1 className="text-base font-semibold leading-loose">{activity.title}</h1>
                                <p className="text-sm text-slate-600">{activity.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default Activities;