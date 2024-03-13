import ViewContainer from "@/components/ViewContainer";
import ViewTitle from "@/components/ViewTitle";

async function UsersLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewContainer>
      <ViewTitle>Users</ViewTitle>
      <div className="flex h-full min-h-0 w-full flex-row justify-between gap-x-8">
        {children}
      </div>
    </ViewContainer>
  );
}

export default UsersLayout;
