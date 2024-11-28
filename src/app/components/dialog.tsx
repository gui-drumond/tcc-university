import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";


export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="w-34 p-8 rounded-3xl rounded-r-none shadow-2xl text-lg  border text-gray-700 bg-white  hover:bg-indigo-100"
          onClick={() => console.log("")}
        >
          <Info
            style={{
              width: "1.5rem",
              height: "1.5rem",
            }}
          />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <p className="text-right">Name</p>
          </div>
          <div className="grid grid-cols-4 items-center gap-4"></div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
