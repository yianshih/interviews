/**
 * In the previous part, we worked with a simplified document format. In actual fact, shapes can contain other shapes.
 * Given this new document format, can you modify your algorithm to calculate the average colour of the designs?
 * An updated `fetchDesign` function has been provided.
 */

function fetchDesign(id) {
  return Promise.resolve({
    designId: id,
    shapes: [
      { shapeId: "basic-shape", color: { r: 55, g: 40, b: 255 }, children: [] },
      {
        shapeId: "duck",
        color: { r: 255, g: 255, b: 252 },
        children: [
          {
            shapeId: "duck-bill",
            color: { r: 255, g: 255, b: 255 },
            children: [],
          },
          {
            shapeId: "duck-body",
            color: { r: 205, g: 255, b: 252 },
            children: [],
          },
          {
            shapeId: "duck-legs",
            color: { r: 100, g: 255, b: 252 },
            children: [],
          },
        ],
      },
      {
        shapeId: "zigzag-polygon",
        color: { r: 205, g: 255, b: 252 },
        children: [],
      },
      {
        shapeId: "fish",
        color: { r: 205, g: 255, b: 252 },
        children: [
          {
            shapeId: "fish-eyes",
            color: { r: 255, g: 255, b: 255 },
            children: [],
          },
          {
            shapeId: "fish-fin",
            color: { r: 100, g: 66, b: 74 },
            children: [
              {
                shapeId: "fish-fin-part-1",
                color: { r: 93, g: 54, b: 55 },
                children: [],
              },
              {
                shapeId: "fish-fin-part-2",
                color: { r: 33, g: 255, b: 255 },
                children: [],
              },
              {
                shapeId: "fish-fin-part-3",
                color: { r: 128, g: 53, b: 255 },
                children: [],
              },
            ],
          },
          {
            shapeId: "fish-tail",
            color: { r: 255, g: 5, b: 255 },
            children: [],
          },
        ],
      },
      {
        shapeId: "duck",
        color: { r: 255, g: 255, b: 252 },
        children: [
          {
            shapeId: "duck-bill",
            color: { r: 255, g: 255, b: 255 },
            children: [],
          },
          {
            shapeId: "duck-body",
            color: { r: 205, g: 255, b: 252 },
            children: [],
          },
          {
            shapeId: "duck-legs",
            color: { r: 100, g: 255, b: 252 },
            children: [],
          },
        ],
      },
    ],
  });
}

const sumShape = (shape) => {
  const { color, children = [] } = shape;

  const childrenSum = children.reduce(
    (acc, curr) => {
      const { r, g, b, count } = sumShape(curr);
      return {
        r: acc.r + r,
        g: acc.g + g,
        b: acc.b + b,
        count: acc.count + count,
      };
    },
    { r: 0, g: 0, b: 0, count: 0 }
  );

  return {
    r: color.r + childrenSum.r,
    g: color.g + childrenSum.g,
    b: color.b + childrenSum.b,
    count: 1 + childrenSum.count,
  };
};

export const test = async () => {
  const { shapes = [] } = await fetchDesign("1");

  const sumShapes = shapes.reduce(
    (acc, curr) => {
      const sum = sumShape(curr);
      return {
        r: acc.r + sum.r,
        g: acc.g + sum.g,
        b: acc.b + sum.b,
        count: acc.count + sum.count,
      };
    },
    { r: 0, g: 0, b: 0, count: 0 }
  );

  const { r, g, b, count } = sumShapes;

  const answer = {
    r: r / count,
    g: g / count,
    b: b / count,
  };

  console.log(answer);

  // expected
  //  { r: 174.05882352941177 g: 192.8235294117647 b: 231.1764705882353 }
};

export const main2 = async () => {
  const { shapes = [] } = await fetchDesign("1");

  let total_r = 0;
  let total_b = 0;
  let total_g = 0;
  let count = 0;

  const travelShape = (shape) => {
    const { color, children = [] } = shape;
    total_r += color.r;
    total_b += color.b;
    total_g += color.g;
    count++;
    if (children.length > 0) {
      children.forEach(travelShape);
    }
  };

  shapes.forEach(travelShape);

  const answer = {
    r: total_r / count,
    g: total_g / count,
    b: total_b / count,
  };

  console.log(answer);

  // expected
  //  { r: 174.05882352941177 g: 192.8235294117647 b: 231.1764705882353 }
};
