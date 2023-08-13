interface Options {
  type?: RegExp | string
}
interface Result {
  data: string
  error: boolean
  valid: boolean
  name: string
}
const isValid = (type: string, options: Options = {}) => {
  if (!options.type) return true;
  let regexp;
  if (options.type instanceof RegExp) {
    regexp = options.type;
  } else {
    regexp = new RegExp(options.type, 'i');
  }
  return regexp.test(type);
}
export async function getDataURLs(filesList: FileList, options: Options = {}) {
  const files = Array.from(filesList);
  const promises = files.map((file) => {
    return new Promise<Result>((resolve) => {
      const { name, type } = file;
      if (!isValid(type, options)) {
        resolve({ data: '',  error: false, valid: false, name });
      } else {
        const valid = true;
        const reader = new FileReader();
        reader.onload = () => {
          const data = reader.result as string; // only used for readAsDataURL
          resolve({ data, error: false, valid, name });
        };
        reader.onerror = () => {
          resolve({ data: '', error: true, valid, name });
        }
        reader.readAsDataURL(file);
      }
    })
  });
  return await Promise.all(promises);
}
