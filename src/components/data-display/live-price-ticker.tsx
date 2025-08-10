"use client";

import { useEffect, useState, memo } from "react";
import socket from "@/lib/socket";
import { Skeleton } from "@/components/ui/skeleton";

type PriceUpdateEvent = {
    price: number;
    timestamp?: number;
};

export const LivePriceTicker = memo(function LivePriceTicker({
    symbol
}: {
    symbol: string
}) {
    const [price, setPrice] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [priceColor, setPriceColor] = useState("text-foreground");

    useEffect(() => {
        const handlePriceUpdate = (data: PriceUpdateEvent) => {
            setPrice(data.price);
        };

        const handleError = (err: Error) => {
            setError("Connection error");
            console.error(err);
        };

        socket.on(symbol, handlePriceUpdate);
        socket.on("connect_error", handleError);

        return () => {
            socket.off(symbol, handlePriceUpdate);
            socket.off("connect_error", handleError);
        };
    }, [symbol]);

    useEffect(() => {
        if (price === null) return;
        setPriceColor("text-green-500 animate-pulse");
        const timer = setTimeout(() => setPriceColor("text-foreground"), 1000);
        return () => clearTimeout(timer);
    }, [price]);

    if (error) return <span className="text-red-500">{error}</span>;
    if (price === null) return <Skeleton className="w-16 h-6" data-testid="price-skeleton" />;

    return (
        <span
            className={`font-mono tabular-nums ${priceColor}`}
            data-testid="live-price"
        >
            ${price.toFixed(2)}
        </span>
    );
});