"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star, MapPin, Filter, Search, Calendar as CalendarIcon, Truck, Plus, X, Loader2 } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format, addDays, differenceInDays } from "date-fns"
import { DateRange } from "react-day-picker"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface EquipmentRentalProps {
    t: any
}

type Equipment = {
    id: string
    name: string
    owner: string
    price: string
    location: string
    rating: number
    image: string
    available: boolean
    quantity: number
    rentedBy?: string
    rentedUntil?: string
}

const DEFAULT_EQUIPMENT: Equipment[] = [
    {
        id: "1",
        name: "Digital Soil pH Tester",
        owner: "Agri Solutions Inc.",
        price: "80",
        location: "4.5",
        rating: 4.9,
        image: "/digital1.jpg?height=200&width=300",
        available: true,
        quantity: 5
    },
    {
        id: "2",
        name: "3-in-1 Soil Meter",
        owner: "FarmTech Supplies",
        price: "65",
        location: "3.8",
        rating: 4.7,
        image: "/3-1.jpg?height=200&width=300",
        available: true,
        quantity: 8
    },
    {
        id: "3",
        name: "John Deere 5075E Tractor",
        owner: "Rajesh Kumar",
        price: "3500",
        location: "2.3",
        rating: 4.8,
        image: "/john-deere-tractor-in-field.png",
        available: true,
        quantity: 2
    },
    {
        id: "4",
        name: "Mahindra 575 DI Tractor",
        owner: "Suresh Patel",
        price: "3200",
        location: "3.1",
        rating: 4.6,
        image: "/mahindra-tractor-farming.png",
        available: true,
        quantity: 3
    },
    {
        id: "5",
        name: "Combine Harvester",
        owner: "Amit Singh",
        price: "8500",
        location: "5.2",
        rating: 4.9,
        image: "/combine-harvester-wheat.png",
        available: false,
        quantity: 0,
        rentedBy: "Current User",
        rentedUntil: "2024-06-20"
    },
    {
        id: "6",
        name: "Rotary Tiller",
        owner: "Priya Sharma",
        price: "1800",
        location: "1.8",
        rating: 4.7,
        image: "/rotary-tiller-farming-equipment.png",
        available: true,
        quantity: 4
    },
]

export const EquipmentRental: React.FC<EquipmentRentalProps> = ({ t }) => {
    const [equipmentList, setEquipmentList] = useState<Equipment[]>([])
    const [searchQuery, setSearchQuery] = useState("")
    const [isListDialogOpen, setIsListDialogOpen] = useState(false)
    const [isRentDialogOpen, setIsRentDialogOpen] = useState(false)
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)

    // Enhanced Rental State
    const [dateRange, setDateRange] = useState<DateRange | undefined>({
        from: new Date(),
        to: addDays(new Date(), 1),
    })
    const [isProcessing, setIsProcessing] = useState(false)

    // New Equipment Form State
    const [newEquipment, setNewEquipment] = useState({
        name: "",
        price: "",
        location: "",
        image: "/placeholder.svg",
        quantity: "1"
    })

    // Load from localStorage or use default, ensuring quantities exist
    useEffect(() => {
        const saved = localStorage.getItem("farmtech-equipment-v2")
        let initialList: Equipment[] = []

        if (saved) {
            try {
                initialList = JSON.parse(saved)
            } catch (e) {
                initialList = DEFAULT_EQUIPMENT
            }
        } else {
            // Initialize with random quantities between 3 and 15
            initialList = DEFAULT_EQUIPMENT.map(item => ({
                ...item,
                quantity: Math.floor(Math.random() * 13) + 3 // Random 3-15
            }))
        }

        setEquipmentList(initialList)
    }, [])

    // Save to localStorage whenever list changes
    useEffect(() => {
        if (equipmentList.length > 0) {
            localStorage.setItem("farmtech-equipment-v2", JSON.stringify(equipmentList))
        }
    }, [equipmentList])

    const handleRent = async () => {
        if (!selectedEquipment || !dateRange?.from || !dateRange?.to) return

        setIsProcessing(true)

        // Simulate payment processing delay
        await new Promise(resolve => setTimeout(resolve, 2000))

        const updatedList = equipmentList.map(item => {
            if (item.id === selectedEquipment.id) {
                const newQuantity = item.quantity - 1
                return {
                    ...item,
                    quantity: newQuantity,
                    available: newQuantity > 0,
                    rentedBy: "Current User",
                    rentedUntil: dateRange.to ? format(dateRange.to, 'yyyy-MM-dd') : ''
                }
            }
            return item
        })

        setEquipmentList(updatedList)
        setIsProcessing(false)
        setIsRentDialogOpen(false)
        setSelectedEquipment(null)
        setDateRange({ from: new Date(), to: addDays(new Date(), 1) })

        toast.success("Equipment Rented Successfully!", {
            description: `You have rented ${selectedEquipment.name}. Check 'Your Rentals' for details.`,
        })
    }

    const handleListEquipment = () => {
        const newItem: Equipment = {
            id: Date.now().toString(),
            name: newEquipment.name,
            owner: "Current User",
            price: newEquipment.price,
            location: newEquipment.location,
            rating: 5.0,
            image: newEquipment.image,
            available: true,
            quantity: parseInt(newEquipment.quantity) || 1
        }

        setEquipmentList([newItem, ...equipmentList])
        setIsListDialogOpen(false)
        setNewEquipment({ name: "", price: "", location: "", image: "/placeholder.svg", quantity: "1" })

        toast.success("Equipment Listed Successfully!", {
            description: `${newItem.name} is now available for rent.`,
        })
    }

    const filteredEquipment = equipmentList.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.owner.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const myRentals = equipmentList.filter(item => item.rentedBy === "Current User")

    const calculateTotalCost = () => {
        if (!selectedEquipment || !dateRange?.from || !dateRange?.to) return 0
        const days = differenceInDays(dateRange.to, dateRange.from) + 1
        return parseInt(selectedEquipment.price) * days
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-serif font-bold text-forest-green mb-2">{t.equipmentRentalTitle}</h1>
                    <p className="text-xl text-gray-600">{t.equipmentRentalDescription}</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content - Equipment List */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg p-6 mb-6">
                            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
                                <h2 className="text-2xl font-semibold">{t.availableEquipment}</h2>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    <div className="relative flex-1 sm:w-64">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                                        <Input
                                            placeholder={t.search}
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="pl-8"
                                        />
                                    </div>
                                    <Button variant="outline" size="icon">
                                        <Filter className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {filteredEquipment.map((equipment) => (
                                    <Card key={equipment.id} className="overflow-hidden hover:shadow-md transition-shadow">
                                        <div className="relative">
                                            <img
                                                src={equipment.image}
                                                alt={equipment.name}
                                                className="w-full h-48 object-cover"
                                            />
                                            {!equipment.available && (
                                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                    <span className="text-white font-semibold">
                                                        {equipment.rentedBy === "Current User" ? t.currentlyRented : t.notAvailable}
                                                    </span>
                                                </div>
                                            )}
                                            {equipment.available && (
                                                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full text-xs font-semibold text-forest-green shadow-sm">
                                                    {equipment.quantity} Available
                                                </div>
                                            )}
                                        </div>
                                        <CardContent className="p-4">
                                            <h3 className="font-semibold text-lg mb-2 truncate">{equipment.name}</h3>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-gray-600 text-sm truncate max-w-[120px]">{t.owner}: {equipment.owner}</span>
                                                <div className="flex items-center">
                                                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                    <span className="ml-1 text-sm">{equipment.rating}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div>
                                                    <span className="text-2xl font-bold text-forest-green">₹{equipment.price}<span className="text-sm font-normal text-gray-500">{t.pricePerDay}</span></span>
                                                    <div className="text-xs text-gray-500 mt-1">
                                                        {equipment.quantity} devices available
                                                    </div>
                                                </div>
                                                <span className="text-gray-500 flex items-center text-sm">
                                                    <MapPin className="h-4 w-4 mr-1" />
                                                    {equipment.location} {t.kmAway}
                                                </span>
                                            </div>
                                            <Button
                                                className="w-full bg-forest-green hover:bg-forest-green/90"
                                                disabled={!equipment.available}
                                                onClick={() => {
                                                    setSelectedEquipment(equipment)
                                                    setIsRentDialogOpen(true)
                                                }}
                                            >
                                                {equipment.available ? t.rentNow : t.notAvailable}
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            {filteredEquipment.length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    No equipment found matching your search.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Rentals & Actions */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t.yourRentals}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {myRentals.length > 0 ? (
                                        myRentals.map(rental => (
                                            <div key={rental.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                                <div>
                                                    <p className="font-semibold text-sm">{rental.name}</p>
                                                    <p className="text-xs text-gray-600">Until: {rental.rentedUntil}</p>
                                                </div>
                                                <Button size="sm" variant="outline" className="h-8 text-xs">
                                                    {t.track}
                                                </Button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 text-center py-4">No active rentals</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>{t.quickActions}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Dialog open={isListDialogOpen} onOpenChange={setIsListDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button className="w-full bg-forest-green hover:bg-forest-green/90">
                                            <Plus className="h-4 w-4 mr-2" />
                                            {t.listMyEquipment}
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>List Your Equipment</DialogTitle>
                                            <DialogDescription>
                                                Share your equipment with the community and earn extra income.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="name">Equipment Name</Label>
                                                <Input
                                                    id="name"
                                                    placeholder="e.g., Tractor, Harvester"
                                                    value={newEquipment.name}
                                                    onChange={(e) => setNewEquipment({ ...newEquipment, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label htmlFor="price">Price per Day (₹)</Label>
                                                    <Input
                                                        id="price"
                                                        type="number"
                                                        placeholder="e.g., 2000"
                                                        value={newEquipment.price}
                                                        onChange={(e) => setNewEquipment({ ...newEquipment, price: e.target.value })}
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="quantity">Quantity</Label>
                                                    <Input
                                                        id="quantity"
                                                        type="number"
                                                        min="1"
                                                        placeholder="e.g., 1"
                                                        value={newEquipment.quantity}
                                                        onChange={(e) => setNewEquipment({ ...newEquipment, quantity: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="location">Distance (km)</Label>
                                                <Input
                                                    id="location"
                                                    type="number"
                                                    placeholder="e.g., 2.5"
                                                    value={newEquipment.location}
                                                    onChange={(e) => setNewEquipment({ ...newEquipment, location: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button variant="outline" onClick={() => setIsListDialogOpen(false)}>Cancel</Button>
                                            <Button
                                                className="bg-forest-green hover:bg-forest-green/90"
                                                onClick={handleListEquipment}
                                                disabled={!newEquipment.name || !newEquipment.price}
                                            >
                                                List Equipment
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>

                                <Button className="w-full bg-transparent" variant="outline">
                                    <CalendarIcon className="h-4 w-4 mr-2" />
                                    {t.scheduleRental}
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            {/* Rent Dialog */}
            <Dialog open={isRentDialogOpen} onOpenChange={setIsRentDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Rent {selectedEquipment?.name}</DialogTitle>
                        <DialogDescription>
                            Select dates and confirm your rental details.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-500">Price per day</p>
                                <p className="font-semibold text-lg">₹{selectedEquipment?.price}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Owner</p>
                                <p className="font-semibold">{selectedEquipment?.owner}</p>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Rental Period</Label>
                            <div className="grid gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            id="date"
                                            variant={"outline"}
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !dateRange && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {dateRange?.from ? (
                                                dateRange.to ? (
                                                    <>
                                                        {format(dateRange.from, "LLL dd, y")} -{" "}
                                                        {format(dateRange.to, "LLL dd, y")}
                                                    </>
                                                ) : (
                                                    format(dateRange.from, "LLL dd, y")
                                                )
                                            ) : (
                                                <span>Pick a date</span>
                                            )}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            initialFocus
                                            mode="range"
                                            defaultMonth={dateRange?.from}
                                            selected={dateRange}
                                            onSelect={setDateRange}
                                            numberOfMonths={2}
                                            disabled={(date) => date < new Date()}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>

                        <div className="flex justify-between items-center pt-2 border-t">
                            <span className="font-semibold">Total Cost:</span>
                            <span className="text-xl font-bold text-forest-green">
                                ₹{calculateTotalCost()}
                            </span>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRentDialogOpen(false)} disabled={isProcessing}>Cancel</Button>
                        <Button
                            className="bg-forest-green hover:bg-forest-green/90 min-w-[120px]"
                            onClick={handleRent}
                            disabled={isProcessing || !dateRange?.from || !dateRange?.to}
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Processing
                                </>
                            ) : (
                                "Confirm Rental"
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
