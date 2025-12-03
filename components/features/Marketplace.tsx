"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, ShoppingCart, Upload } from "lucide-react"

interface MarketplaceProps {
    t: any
}

const MARKET_ITEMS = [
    {
        id: 1,
        name: "Premium Wheat (Lokwan)",
        seller: "Rajesh Kumar",
        price: "2,400",
        unit: "q",
        quantity: "500",
        location: "Pune, MH",
        image: "/golden-wheat-grain-harvest.png"
    },
    {
        id: 2,
        name: "Organic Basmati Rice",
        seller: "Suresh Patel",
        price: "4,500",
        unit: "q",
        quantity: "200",
        location: "Nashik, MH",
        image: "/organic-rice-grains-white.png"
    },
    {
        id: 3,
        name: "Fresh Farm Vegetables",
        seller: "Amit Singh",
        price: "1,800",
        unit: "q",
        quantity: "1000",
        location: "Lasalgaon, MH",
        image: "/farmers-market.jpg"
    },
    {
        id: 4,
        name: "Organic Produce Bundle",
        seller: "Priya Sharma",
        price: "6,200",
        unit: "q",
        quantity: "300",
        location: "Nagpur, MH",
        image: "/organic-farming-methods.png"
    },
    {
        id: 5,
        name: "Soybean Seeds",
        seller: "Vijay Patil",
        price: "3,800",
        unit: "q",
        quantity: "400",
        location: "Latur, MH",
        image: "/healthy-soybean-plant.png"
    },
    {
        id: 6,
        name: "Sweet Corn (Golden)",
        seller: "Ratnagiri Farms",
        price: "1,200",
        unit: "q",
        quantity: "50",
        location: "Ratnagiri, MH",
        image: "/yellow-corn-kernels-harvest.png"
    }
]

export const Marketplace: React.FC<MarketplaceProps> = ({ t }) => {
    const [marketPrices, setMarketPrices] = useState<any[]>([])
    const [allMarketData, setAllMarketData] = useState<any[]>([])
    const [isLoadingPrices, setIsLoadingPrices] = useState(true)
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedState, setSelectedState] = useState("all")

    // Parse CSV line handling quotes
    const parseCSVLine = (line: string) => {
        const values = []
        let currentValue = ''
        let insideQuotes = false

        for (let i = 0; i < line.length; i++) {
            const char = line[i]
            if (char === '"') {
                insideQuotes = !insideQuotes
            } else if (char === ',' && !insideQuotes) {
                values.push(currentValue.trim())
                currentValue = ''
            } else {
                currentValue += char
            }
        }
        values.push(currentValue.trim())
        return values
    }

    // Fetch and parse CSV data
    useEffect(() => {
        const fetchMarketData = async () => {
            try {
                const response = await fetch('/commodities.csv')
                const text = await response.text()
                const lines = text.split('\n')

                // Skip header (line 0) and parse rest
                const parsedData = lines.slice(1).map(line => {
                    if (!line.trim()) return null
                    const cols = parseCSVLine(line)
                    // Expected format: State, District, Market, Commodity, Variety, Grade, Date, Min, Max, Modal
                    if (cols.length < 10) return null

                    return {
                        state: cols[0],
                        district: cols[1],
                        market: cols[2],
                        name: cols[3],
                        variety: cols[4],
                        min: cols[7],
                        max: cols[8],
                        modal: cols[9],
                        date: cols[6]
                    }
                }).filter(item => item !== null)

                setAllMarketData(parsedData)
                setMarketPrices(parsedData.slice(0, 20)) // Initial display
                setIsLoadingPrices(false)
            } catch (error) {
                console.error("Error loading market data:", error)
                setIsLoadingPrices(false)
            }
        }

        fetchMarketData()
    }, [])

    // Filter data when search or state changes
    useEffect(() => {
        if (allMarketData.length === 0) return

        let filtered = allMarketData

        if (selectedState && selectedState !== "all") {
            filtered = filtered.filter(item =>
                item.state.toLowerCase().includes(selectedState.toLowerCase())
            )
        }

        if (searchTerm) {
            const lowerSearch = searchTerm.toLowerCase()
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(lowerSearch) ||
                item.market.toLowerCase().includes(lowerSearch)
            )
        }

        setMarketPrices(filtered.slice(0, 50)) // Limit display for performance
    }, [searchTerm, selectedState, allMarketData])

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h1 className="text-4xl font-serif font-bold text-forest-green mb-2">{t.marketplaceTitle}</h1>
                    <p className="text-xl text-gray-600">{t.marketplaceDescription}</p>
                </div>

                <Tabs defaultValue="buy" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="buy">{t.buyCrops}</TabsTrigger>
                        <TabsTrigger value="sell">{t.sellCrops}</TabsTrigger>
                        <TabsTrigger value="prices">{t.marketPrices}</TabsTrigger>
                    </TabsList>

                    <TabsContent value="buy">
                        <div className="flex gap-4 mb-6">
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input placeholder="Search crops..." className="pl-10" />
                            </div>
                            <Button variant="outline">
                                <Filter className="h-4 w-4 mr-2" />
                                {t.filter}
                            </Button>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6">
                            {MARKET_ITEMS.map((item) => (
                                <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="h-48 bg-gray-200 relative">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-sm font-semibold text-forest-green">
                                            ₹{item.price}/{item.unit}
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-bold text-lg">{item.name}</h3>
                                                <p className="text-sm text-gray-500">{t.by} {item.seller}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="block text-sm font-medium text-green-600">{t.trending}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-500 mb-4">
                                            <span>{item.quantity} {t.kgAvailable}</span>
                                            <span className="mx-2">•</span>
                                            <span>{item.location}</span>
                                        </div>
                                        <Button className="w-full bg-forest-green hover:bg-forest-green/90">
                                            <ShoppingCart className="h-4 w-4 mr-2" />
                                            {t.buyNow}
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="sell">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t.listYourCrops}</CardTitle>
                                <CardDescription>{t.sellYourHarvest}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="crop-name">{t.cropName}</Label>
                                            <Input id="crop-name" placeholder="e.g., Premium Wheat" />
                                        </div>
                                        <div>
                                            <Label htmlFor="quantity">{t.quantityKg}</Label>
                                            <Input id="quantity" type="number" placeholder="1000" />
                                        </div>
                                        <div>
                                            <Label htmlFor="price">{t.pricePerKg}</Label>
                                            <Input id="price" type="number" placeholder="24" />
                                        </div>
                                        <div>
                                            <Label htmlFor="location">{t.location}</Label>
                                            <Input id="location" placeholder="Village, District" />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <Label htmlFor="harvest-date">{t.harvestDate}</Label>
                                            <Input id="harvest-date" type="date" />
                                        </div>
                                        <div>
                                            <Label htmlFor="description">{t.description}</Label>
                                            <textarea
                                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                                placeholder="Describe quality, variety, etc."
                                            />
                                        </div>
                                        <div>
                                            <Label>{t.uploadPhotos}</Label>
                                            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-forest-green transition-colors cursor-pointer">
                                                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                                                <span className="text-sm text-gray-600">{t.uploadPrompt}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Button className="w-full bg-forest-green hover:bg-forest-green/90 text-lg">
                                    {t.listCropForSale}
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="prices">
                        <Card>
                            <CardHeader>
                                <CardTitle>{t.marketPrices}</CardTitle>
                                <CardDescription>
                                    Real-time data from Government of India (AGMARKNET)
                                    {allMarketData.length > 0 && ` • ${allMarketData.length} records loaded`}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-col gap-4 mb-6">
                                    <div className="flex gap-4">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                            <Input
                                                placeholder={t.searchCommodity}
                                                className="pl-10"
                                                value={searchTerm}
                                                onChange={(e) => setSearchTerm(e.target.value)}
                                            />
                                        </div>
                                        <Select value={selectedState} onValueChange={setSelectedState}>
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue placeholder="Select State" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="all">All States</SelectItem>
                                                <SelectItem value="maharashtra">Maharashtra</SelectItem>
                                                <SelectItem value="gujarat">Gujarat</SelectItem>
                                                <SelectItem value="karnataka">Karnataka</SelectItem>
                                                <SelectItem value="punjab">Punjab</SelectItem>
                                                <SelectItem value="haryana">Haryana</SelectItem>
                                                <SelectItem value="uttar pradesh">Uttar Pradesh</SelectItem>
                                                <SelectItem value="madhya pradesh">Madhya Pradesh</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="rounded-md border">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>{t.commodity}</TableHead>
                                                <TableHead>{t.market}</TableHead>
                                                <TableHead>{t.minPrice}</TableHead>
                                                <TableHead>{t.maxPrice}</TableHead>
                                                <TableHead>{t.modalPrice}</TableHead>
                                                <TableHead>{t.arrivalDate}</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {isLoadingPrices ? (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-center py-8">
                                                        Loading market data...
                                                    </TableCell>
                                                </TableRow>
                                            ) : marketPrices.length > 0 ? (
                                                marketPrices.map((item, i) => (
                                                    <TableRow key={i}>
                                                        <TableCell className="font-medium">
                                                            {item.name}
                                                            <span className="block text-xs text-gray-400">{item.variety}</span>
                                                        </TableCell>
                                                        <TableCell>
                                                            {item.market}
                                                            <span className="block text-xs text-gray-400">{item.state}</span>
                                                        </TableCell>
                                                        <TableCell>₹{item.min}</TableCell>
                                                        <TableCell>₹{item.max}</TableCell>
                                                        <TableCell className="font-bold text-forest-green">₹{item.modal}</TableCell>
                                                        <TableCell>{item.date}</TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                                        No matching records found.
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
