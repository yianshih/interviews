// // TO DO
// // 1000 Tasks.

// type Task = {
//   id: number;
//   body: string; // clean dish, cook dinner
// };

// class TaskService {
//   private globalId: number;
//   private store: Task[];
//   constructor() {
//     this.globalId = 0;
//     this.store = [];
//   }

//   add(body: string) {
//     const task = { id: this.globalId++, body };

//     this.store.push(task);

//     return task;
//   }

//   delete(id: number) {
//     this.store = this.store.filter((task) => task.id !== id);
//   }

//   getTasks() {
//     return this.store;
//   }
// }

export {};
