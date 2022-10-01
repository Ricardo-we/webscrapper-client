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
        setLanguage(await import(`../settings/languages/${langname}.json`) as LanguageBase);
    }

    useEffect(() => {
        getLanguage()
    }, [langname])

    return { language, setLanguage }
}
