export default {
  collections: ["notes"],
  processContext: (context) => {
    console.log(context.notes[0]);
    return context;
  },
};
