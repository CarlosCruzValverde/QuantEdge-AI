"use client";
import { useEffect, useRef } from "react";
import {
    createChart,
    ColorType,
    CandlestickData,
    Time,
    ISeriesApi,
    CandlestickSeriesOptions,
    IChartApi,
    CandlestickSeries,
    LineStyle,
    PriceLineSource,
} from "lightweight-charts";

type Candle = CandlestickData<Time>;

export function CandlestickChart({ data }: { data: Candle[] }) {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartInstanceRef = useRef<IChartApi | null>(null);
    const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);

    useEffect(() => {
        if (!chartContainerRef.current) return;

        const chart = createChart(chartContainerRef.current, {
            layout: {
                background: { type: ColorType.Solid, color: "transparent" },
                textColor: "#D9D9D9",
            },
            grid: {
                vertLines: { color: "#444" },
                horzLines: { color: "#444" },
            },
            width: chartContainerRef.current.clientWidth,
            height: chartContainerRef.current.clientHeight || 400,
        });

        chartInstanceRef.current = chart;

        const seriesOptions: CandlestickSeriesOptions = {
            // Candlestick colors
            upColor: "#26a69a",
            downColor: "#ef5350",
            borderUpColor: "#26a69a",
            borderDownColor: "#ef5350",
            wickUpColor: "#26a69a",
            wickDownColor: "#ef5350",

            // Required candlestick style flags
            wickVisible: true,
            borderVisible: true,
            borderColor: "#26a69a",
            wickColor: "#26a69a",

            // Required SeriesOptionsCommon
            visible: true,
            title: "",
            priceLineSource: PriceLineSource.LastBar,
            priceLineWidth: 1,
            priceLineColor: "#000000",
            priceLineStyle: LineStyle.Solid,
            priceLineVisible: false,
            lastValueVisible: true,
            baseLineVisible: false,
            baseLineColor: "#000000",
            baseLineWidth: 1,
            baseLineStyle: LineStyle.Solid,

            // Price scale & format
            priceScaleId: "right",
            priceFormat: {
                type: "price",
                precision: 2,
                minMove: 0.01,
            },
        };

        const series = chart.addSeries(CandlestickSeries, seriesOptions);
        seriesRef.current = series;

        if (data.length > 0) {
            series.setData(data);
        }

        // Auto resize via ResizeObserver
        const resizeObserver = new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            chart.applyOptions({ width, height });
        });
        resizeObserver.observe(chartContainerRef.current);

        return () => {
            resizeObserver.disconnect();
            chart.remove();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (seriesRef.current && data.length > 0) {
            seriesRef.current.setData(data);
        }
    }, [data]);

    return (
        <div
            ref={chartContainerRef}
            style={{
                width: "100%",
                height: "400px",
            }}
        />
    );
}