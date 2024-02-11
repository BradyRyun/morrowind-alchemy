"use client";
import {Button} from "@/components/ui/button";
import {getOverlappingEffectsOfIngredients, IngredentsTable} from "@/app/ingredents-table";
import {ingredients} from '@/constants/ingredients';
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {Footer} from "@/app/footer";
export default function Home() {
    const data = Object.entries(ingredients)
    const columns = ["Name", "Effect 1", "Effect 2", "Effect 3", "Effect 4"];
    const [lastAddedType, setLastAddedType] = useState<string>("");
    const [lastAdded, setLastAdded] = useState<string>("");
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
          <div className={"md:w-2/3 mx-auto font-viner flex flex-col gap-y-2"}>
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
              {
                  lastAdded != "" && (
                      <Button
                          onClick={() => {
                              if (lastAddedType === "effect") {
                                  setSelectedEffect(selectedEffect.filter(effect => effect !== lastAdded))
                              }
                            if (lastAddedType === "ingredient") {
                                setSelectedIngredients(selectedIngredients.filter(ingredient => ingredient !== lastAdded))
                            }
                            setLastAdded("");
                            setLastAddedType("");
                      }}>
                          Undo
                      </Button>
                  )
              }
              {
                  (selectedIngredients.length > 0 || selectedEffect.length > 0) && (
                        <Button
                            className={"bg-red-500"}
                            onClick={() => {
                                setSelectedIngredients([])
                                setSelectedEffect([])
                            }}>
                            Reset
                        </Button>
                    )
              }
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
      <Footer />
      </main>
  );
}
