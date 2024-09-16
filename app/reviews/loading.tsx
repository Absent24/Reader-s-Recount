import { Skeleton } from "@/components/ui/skeleton";

function loading() {
  return (
    <div className="mt-6 w-full min-w-full">
      <h3 className="text-lg font-bold mb-6">My reviews</h3>
      <div className="grid lg:grid-cols-2 gap-2 mt-2">
        <div className="relative">
          <Skeleton>
            <div className="flex flex-row justify-between">
              <div className="flex items-cente m-4">
                <Skeleton className="w-12 h-12 rounded-full" />
              </div>
            </div>
          </Skeleton>
          <Skeleton className="h-[150px]"></Skeleton>
        </div>
        <div className="relative">
          <Skeleton>
            <div className="flex flex-row justify-between">
              <div className="flex items-center m-4">
                <Skeleton className="w-12 h-12 rounded-full object-cover" />
              </div>
            </div>
          </Skeleton>
          <Skeleton className="h-[150px]"></Skeleton>
        </div>
      </div>
    </div>
  );
}

export default loading;
