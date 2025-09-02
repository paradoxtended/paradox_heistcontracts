type Locale = {
    [key: string]: string;
};

let translations: Locale = {};

export async function loadLocales(locale: string) {
    const response = await fetch(`./locales/${locale}.json`);
    translations = await response.json();
}

export function locale(key: string, ...replacements: (string | number)[]) {
    let value = translations[key] ?? key;
    replacements.forEach(r => {
        value = value.replace("%s", String(r));
    });

    return value
}