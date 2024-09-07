'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import axios from "axios";
import Link from "next/link";
import {
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    Search,
    ShoppingCart,
    Users2,
    Filter,
    ArrowDownAZ,
    ArrowUpZA,
    ArrowDown01,
    ArrowUp10,
    Archive,
    Eye,
    Edit,
    Trash
} from "lucide-react";
import ThemeToggle from '@/components/ThemeToggle';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '@/components/ui/alert-dialog';

export default function Dashboard() {
    const [data, setData] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);

    
    useEffect(() => {
        axios.get('http://localhost/crude-api/fetch_records.php')
            .then(response => setData(response.data))
            .catch(error => console.log(error));
    }, []);
    const handleDelete = (id) => {
        axios.post('http://localhost/crude-api/delete_record.php', { id }, {
            headers: {
                'Content-Type': 'application/json', 
            }
        })
            .then(response => {
                console.log(response.data); 
                if (response.data.message === 'Record deleted successfully') {
                    setData(data.filter(record => record.contact_id !== id)); 
                } else {
                    console.error('Delete failed:', response.data.message);
                }
            })
            .catch(error => console.error('Error deleting record:', error));
    };



    return (
        <TooltipProvider>
            <div className="flex min-h-screen w-full flex-col bg-muted/40">
                {/* Sidebar */}
                <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                        <img
                            src="/assets/cocicon.png"
                            alt="Logo"
                            className="h-10 w-10 mb-1"
                        />
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="/dashboard"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Home className="h-5 w-5" />
                                    <span className="sr-only">CRUDE - Dashboard</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">CRUDE - Dashboard</TooltipContent>
                        </Tooltip>
                    </nav>
                </aside>

                <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button size="icon" variant="outline" className="sm:hidden">
                                    <PanelLeft className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="sm:max-w-xs">
                                <nav className="grid gap-6 text-lg font-medium">
                                    <Link
                                        href="/dashboard"
                                        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                    >
                                        <Home className="h-5 w-5 transition-all group-hover:scale-110" />
                                        <span className="sr-only">IT Days - Dashboard</span>
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </header>

                    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-black">CRUDE Dashboard</CardTitle>
                                <CardDescription>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Phone Number</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data.length ? (
                                            data.map(record => (
                                                <TableRow key={record.contact_id}>
                                                    <TableCell>{record.name}</TableCell>
                                                    <TableCell>{record.phone}</TableCell>
                                                    <TableCell>
                                                        {/* VIEW Button with Eye Icon */}
                                                        <Button variant="outline" className="mr-2">
                                                            <Eye className="mr-2 h-4 w-4" /> View
                                                        </Button>

                                                        {/* EDIT Button with Edit Icon */}
                                                        <Button variant="outline" className="mr-2">
                                                            <Edit className="mr-2 h-4 w-4" /> Edit
                                                        </Button>

                                                        {/* DELETE Button with Trash Icon */}
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="destructive">
                                                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <h2>Confirm Delete</h2>
                                                                    <p>Are you sure you want to delete this record?</p>
                                                                </AlertDialogHeader>
                                                                <div>
                                                                    <p>Name: {record.name}</p>
                                                                    <p>Phone Number: {record.phone}</p>
                                                                    <p>Email: {record.email}</p>
                                                                    <p>Address: {record.address}</p>
                                                                    <p>Group: {record.group}</p>
                                                                    <p>Owner: {record.owner}</p>
                                                                </div>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleDelete(record.contact_id)}>Delete</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </TableCell>
                                                </TableRow>

                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center">
                                                    No data available
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </main>
                </div>
            </div>
        </TooltipProvider>
    );
}
