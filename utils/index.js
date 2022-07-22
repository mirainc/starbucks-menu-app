export const getRecord = (data, tag) => {
  const record = data.find((x) => {
    return x.tags.includes(tag);
  });

  return record;
};

export const getTag = (tags, tagName) => {
  const record = tags.find((x) => {
    return x.includes(tagName);
  });

  if (!record) return "";

  const [_tagKey, tagValue] = record.split(":");
  return tagValue;
};

export const formatPrice = (number) => {
  const priceFormatted = new Intl.NumberFormat("en-IN", {
    minimumSignificantDigits: 3,
  }).format(number);

  return priceFormatted;
};
