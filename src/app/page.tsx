"use client";
import {Button} from "@/components/ui/button";
import {getOverlappingEffectsOfIngredients, IngredentsTable} from "@/app/ingredents-table";
import {ingredients} from '@/constants/ingredients';
import {useState} from "react";
import {Input} from "@/components/ui/input";
export default function Home() {
    const data = Object.entries(ingredients)
    const columns = ["Name", "Effect 1", "Effect 2", "Effect 3", "Effect 4"];
    const [selectedEffect, setSelectedEffect] = useState<string[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
    const paredSelectedEffects = selectedEffect.join(", ")
    const parsedSelectedIngredients = selectedIngredients.join(", ")
    const [searchTerm, setSearchTerm] = useState("");
    function parsedEffectsFromSelectedIngredients() {
        const effectList = getOverlappingEffectsOfIngredients(selectedIngredients, data);
        return effectList.join(", ");
    }
    return (
      <main className={"my-8"}>
          <h1 className={"text-4xl font-viner text-center"}>
              Morrowind Alchemy
          </h1>
          <div className={"w-2/3 mx-auto font-viner flex flex-col gap-y-2"}>
              <p>
                  Search: <Input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
              </p>
              <p>Selected Effects: {paredSelectedEffects}</p>
              <p>Selected Ingredients: {parsedSelectedIngredients}</p>
              {
                  selectedIngredients.length > 1 && (
                      <p>Effects from selected ingredients: {parsedEffectsFromSelectedIngredients()}</p>
                  )
              }
              <Button onClick={() => {
                  setSelectedIngredients([])
                  setSelectedEffect([])
              }}>
                  Reset
              </Button>
              <IngredentsTable
                  ingredients={data}
                  columns={columns}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedIngredients={selectedIngredients}
                  setSelectedIngredients={setSelectedIngredients}
                  selectedEffects={selectedEffect}
                  setSelectedEffects={setSelectedEffect}/>
          </div>
      <div>
      </div>
    </main>
  );
}
