import { useEffect, useState } from "react";

export type languages = "es";
export interface LanguageBase {
    general?: any,
    fields?: any,
    module?: any
}

export default function useLanguage(langname: languages) {
    const [language, setLanguage] = useState<LanguageBase>({ general: {}, fields: {}, module: {} });

    const getLanguage = async () => {
        try{
            const foundedLanguage = await import(`../settings/languages/${langname}.json`) as LanguageBase;
            setLanguage(foundedLanguage);
        } catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        getLanguage()
    }, [langname])

    return { language, setLanguage }
}
