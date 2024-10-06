export const translateAttributes = (data: any, direction: 'toDB' | 'toClient' = 'toClient') => {
    const translations: any = {
      name: 'nombre',
      description: 'descripcion',
    };
  
    const translated: any = {};
    
    Object.keys(data).forEach((key) => {
      const translatedKey = direction === 'toClient' ? translations[key] || key : Object.keys(translations).find(k => translations[k] === key) || key;
      translated[translatedKey] = data[key];
    });
  
    return translated;
  };
  