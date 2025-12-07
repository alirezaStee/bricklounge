import rawItems from "@/data/items.json";
import { NextResponse } from "next/server";

interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

type ItemsMap = Record<string, Item[]>;

const items: ItemsMap = rawItems as ItemsMap;


export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; 
  const categoryItems = (items as Record<string, any[]>)[id] || [];
  return NextResponse.json(categoryItems);
}