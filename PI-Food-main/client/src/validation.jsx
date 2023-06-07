export function validate(name, value) {
  switch (name) {
    case 'instructions':
      if (value.length > 200) {
        return [name, 'step by step cant have more than 200 characters.'];
      } else if (value.length === 0) {
        return [name, 'step by step field is required.'];
      }
      break;

    case 'ingredients':
      if (value.length > 200) {
        return [name, 'ingredients cant have more than 200 characters.'];
      } else if (value.length === 0) {
        return [name, 'ingredients field is required.'];
      }
      break;

    case 'summary':
      if (value.length > 200) {
        return [name, 'summary cant have more than 200 characters.'];
      } else if (value.length === 0) {
        return [name, 'summary field is required.'];
      }
      break;

    case 'readyInMinutes':
      if (value.length === 0) {
        return [name, 'the time field is required.'];
      }
      break;

    case 'title':
      if (value.length === 0) {
        return [name, 'the name field is required.'];
      }
      break;

    case 'image':
      const urlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9]+([-.]{1}[a-zA-Z0-9]+)*\.[a-zA-Z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
      if (value.length === 0) {
        return [name, 'the image field is required.'];
      } else if (!urlPattern.test(value)) {
        return [name, 'the image has to be a URL.'];
      }
      break;

    case 'healthScore':
      console.log(value.length);
      if (value.length === 0) {
        return [name, 'health score field is required.'];
      }
      if (value > 100) {
        return [name, 'health score cant be more than 100.'];
      }
      break;

    default:
      return [];
  }
  return [];
}


export function validateOnSubmit(formData) {
  const emptyValues = Object.entries(formData).reduce((accumulator, [key, value]) => {
    let error;
    if (value === '' || (Array.isArray(value) && value.length === 0) || (!Array.isArray(value) && !(typeof value === 'string') && isNaN(value))) {
      error =  key + ' field is required.';
      accumulator.push({ key, value, error });
    }
    return accumulator;
  }, []);

  return emptyValues;
}


