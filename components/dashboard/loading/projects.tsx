import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";


const LoadingProjects = () => {
  return (
    <>
      <Card className="w-full shadow-sm shadow-slate-400 lg:w-2/3">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold tracking-wide">
            Recent Projects
          </CardTitle>
          <CardDescription className="text-xs">
            List of your recent projects
          </CardDescription>
        </CardHeader>
        <CardContent className="h-full py-4">
          <div className="grid w-full grid-cols-1 items-center justify-center gap-4 py-4 lg:grid-cols-3">
            {[...Array(3)].map((index) => (
              <div
                key={index}
                className="h-full"
              >
                <Card className="h-full w-full border border-slate-300 shadow-sm dark:border-slate-600">
                  <CardHeader className="pt-4">
                    <CardTitle className="flex flex-row justify-between">
                      <Skeleton className="w-full h-6"></Skeleton>
                    </CardTitle>
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent className="py-4">
                    <div>
                      <Skeleton className="h-4 w-full"></Skeleton>
                    </div>
                  </CardContent>
                  <CardFooter className="pb-4 text-sm">
                    <Skeleton className="h-4 w-full"></Skeleton>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default LoadingProjects