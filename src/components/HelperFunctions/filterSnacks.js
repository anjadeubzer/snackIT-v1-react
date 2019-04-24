/**
 * const filterSnacks
 *
 * this filter function filter the snack
 * while we type into SnackSearch field
 *
 * **/
export const filterSnacks = ( snacks, inputValue ) => {
    // const snacks = useContext(SnackItContext);
    let wpSnacksFiltered = snacks.wpSnacks;
    let filterTerm = inputValue;

    function escapeRegExp(s) {
        return s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
    }

    const theWords = filterTerm
        .split(/\s+/g)
        .map(s => s.trim())
        .filter(s => !!s);

    const hasTrailingSpace = filterTerm.endsWith(" ");

    const searchRegex = new RegExp(
        theWords
            .map((oneWord, i) => {
                if (i + 1 === theWords.length && !hasTrailingSpace) {
                    // The last word - ok with the word being "startswith"-like
                    return `(?=.*\\b${escapeRegExp(oneWord)})`;
                }
                else {
                    // Not the last word - expect the whole word exactly
                    return `(?=.*\\b${escapeRegExp(oneWord)}\\b)`;
                }
            })
            .join("") + ".+",
        "gi" // gi means case insensitiv
    );


    wpSnacksFiltered = wpSnacksFiltered.filter((snack) => {

        if (
            searchRegex.test(snack.title) === true
            || searchRegex.test(snack.snack_group) === true
            || searchRegex.test(snack.snack_brand) === true
            || searchRegex.test(snack.snack_price) === true
            || searchRegex.test(snack.snack_size) === true
            || searchRegex.test(snack.description) === true
        ) {
            return true;
        }
        else {
            return false;
        }
    });
    snacks.setFilteredSnacks(wpSnacksFiltered);
};