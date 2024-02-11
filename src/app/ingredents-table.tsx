import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

const parseName = (name: string) => {
    return name.split('_').join(' ')
}

const getEffectsForIngredient = (ingredient: string, data: [string, string[]][]) => {
    const effects = data.find(([ingredientName, _]) => ingredientName === ingredient);
    if (!effects) {
        console.error("Magical error appeared");
        return;
    }
    return effects[1];
}

export const getOverlappingEffectsOfIngredients = (ingredients: string[], data: [string, string[]][]) => {
    // Check for duplicates in effect list of ingredients.
    const allEffectsOfIngredients = getAllEffectsOfIngredients(ingredients, data);
    const map = {};
    const overlappingEffects = [];
    for (const effect of allEffectsOfIngredients) {
        // @ts-ignore
        if (map[effect]) {
            overlappingEffects.push(effect);
        } else {
            // @ts-ignore
            map[effect] = true;
        }
    }
    return overlappingEffects;
}
const getAllEffectsOfIngredients = (ingredients: string[], data: [string, string[]][]) => {
    const effectList: string[] = [];
    for (const ingredient of ingredients) {
        const ingredientEffects = getEffectsForIngredient(ingredient, data);
        if (!ingredientEffects) {
            continue;
        }
        effectList.push(...ingredientEffects);
    }
    return effectList;

}
const generateIngredientsTable = (data: [string, string[]][], selectedIngredients: string[] , selectedEffects: string[], handleEffectClick: (effect: string) => void, handleIngredientClick: (ingredient: string) => void, searchTerm: string, setSearchTerm: (s: string) => void) => {
    let tableData: [string, string[]][] = data;
    // If there is a selected ingredient, only filter by some of the ingredients.
    if (selectedEffects.length > 0) {
        tableData = data.filter(([_, effects]) => {
            return selectedEffects.every(effect => effects.includes(effect));
        })
    }
    else if (selectedIngredients.length > 0) {
        // Search for all ingredients that match at least one or more of all selected ingredient effects
        const effectList: string[] = getAllEffectsOfIngredients(selectedIngredients, data);
        tableData = data.filter(([_, effects]) => {
            return effectList.some(effect => effects.includes(effect));
        })
    }
    if (searchTerm) {
        tableData = tableData.filter(([ingredientName, effects]) => {
            // Check if the ingredient name includes the searchTerm
            const nameMatch = ingredientName.split("_").join(" ").toLowerCase().includes(searchTerm.toLowerCase());

            // Check if any of the remaining effects includes the searchTerm
            const effectMatch = effects.some(effect => effect.toLowerCase().includes(searchTerm.toLowerCase()));

            // Return true if either the name or any of the effects match the searchTerm
            return nameMatch || effectMatch;
        });
    }

    // From each ingredient, produce a new row.
    return tableData.map(([ingredientName, effects], i) => {
        if (selectedIngredients.includes(ingredientName)) {
            return;
        }
        return (
            <TableRow key={i}>
                <TableCell className={"cursor-pointer hover:underline"} onClick={() => {
                    handleIngredientClick(ingredientName)
                    setSearchTerm("")
                }}>
                    {parseName(ingredientName)}
                </TableCell>
                {effects.map((effect, i) => {

                    return (
                        <TableCell className={'cursor-pointer hover:underline'} key={i} onClick={() => {
                            handleEffectClick(effect)
                            setSearchTerm("")
                        }}>
                            {effect}
                        </TableCell>
                    )
                })}
            </TableRow>
        )
    })
}

const generateColumns = (columns: string[]) => {
    return columns.map((column, i) => {
        return (
            <TableHead key={i}>
                {column}
            </TableHead>
        )
    })
}

type IngredientTableProps = {
    ingredients: [string, string[]][]
    columns: string[]
    selectedEffects: string[]
    setSelectedEffects: (effect: string[]) => void
    selectedIngredients: string[]
    setSelectedIngredients: (ingredient: string[]) => void
    searchTerm: string;
    setSearchTerm: (searchTerm: string) => void;
}
export const IngredentsTable = (props: IngredientTableProps) => {
    const {ingredients, columns, selectedEffects, setSelectedEffects, selectedIngredients, setSelectedIngredients, searchTerm, setSearchTerm} = props
    const handleEffectClick = (effect: string) => {
        if (selectedEffects) {
            if (selectedEffects.includes(effect)) {
                return;
            } else {
                setSelectedEffects([effect, ...selectedEffects])
            }
        } else {
            setSelectedEffects([effect])
        }
        if (selectedIngredients) {
            setSelectedIngredients([])
        }
    }
    const handleIngredientClick = (ingredient: string) => {
        if (selectedIngredients) {
            if (selectedIngredients.length >= 4) {
                return;
            }
            if (selectedIngredients.includes(ingredient)) {
                return;
            } else {
                setSelectedIngredients([ingredient, ...selectedIngredients])
            }
        } else {
            setSelectedIngredients([ingredient])
        }
        if (selectedEffects) {
            setSelectedEffects([])
        }
    }
    return (
        <Table className={'text-md'}>
            <TableHeader>
                <TableRow>
                    {generateColumns(columns)}
                </TableRow>
            </TableHeader>
            <TableBody>
                {generateIngredientsTable(ingredients, selectedIngredients, selectedEffects, handleEffectClick, handleIngredientClick, searchTerm, setSearchTerm)}
            </TableBody>
        </Table>
    )
}
