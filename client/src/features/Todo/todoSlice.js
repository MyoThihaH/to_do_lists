
import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, } from "@reduxjs/toolkit";
import { fetchPost, postData, deleteData, updateData, allComplete, allUnComplete, clearComplete } from "../../api/api";


export const generateId = (state)=> {
    const arr = state.todos.ids;
    return arr.length-1>=0?arr[arr.length-1]+1:0
    
}

export const fetchTodos = createAsyncThunk('todo/fetchTodos', async () => {
  const data =  await fetchPost();
  return data;
});



export const todoAdd = createAsyncThunk('todo/todoAdd', async (text) => {
    
    const data = await postData({description: text});
    return data;

});

export const todoDelete = createAsyncThunk('todo/todoDelete', async (id) => {
    await deleteData({_id: id});
    return id;
});

export const todoComplete = createAsyncThunk('todo/todoComplete', async (datas) => {
    await updateData({_id: datas._id, completed: datas.changes.completed});
    return {id: datas._id, changes:{completed: datas.changes.completed}};
    
})

export const todoAllComplete = createAsyncThunk('todo/todoAllComplete',async () => {
    const data = await allComplete();
    return data;
})

export const todoAllUnComplete = createAsyncThunk('todo/todoAllUnComplete',async () => {
    const data = await allUnComplete();
    return data;
})

export const todoClearComplete = createAsyncThunk('todo/todoClearComplete', async () => {
    const data = await clearComplete();
    return data;
})

export const todoSelect = createAsyncThunk('todo/todoSelect', async (datas) => {

    
    await updateData({_id:datas._id, color:datas.changes.color});
    return {id:datas._id, changes:{color: datas.changes.color}}
} )

const todoAdapter = createEntityAdapter({
    selectId: (data) => data._id,
   
});



const initialState = todoAdapter.getInitialState({open:false});

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        todoDeleteSnack: (state, action) => {
            state.open = action.payload;
            
        }
        // todoAdd: {
        //     reducer: (state, action) => {
        //          todoAdapter.addOne(state, action.payload)
        //     },
        //     prepare: (id, description) => {
        //         return {payload:{id: id, complete: false, description: description, color: ''}}
               
        //     }
        // },
        // todoComplete: (state, action) => {
        //     todoAdapter.updateOne(state, action.payload)
        // },
        // todoDelete: (state, action) => {
        //     todoAdapter.removeOne(state, action.payload)
        // },
        // todoAllComplete: (state, action) => {
        //     const update_arr = state.ids.map((id) => {
        //             return {id: id, changes: {complete: true}}
        //         })
        //     todoAdapter.updateMany(state, update_arr)
        // },
        // todoClearComplete: (state, action) => {
        //     const completeTodoArray = Object.values(state.entities).filter((todo) => todo.complete);
        //     const completeIds = completeTodoArray.map(todo => todo.id);
        //     todoAdapter.removeMany(state, completeIds);
        // },
        // todoSelect: (state, action) => {
        //     todoAdapter.updateOne(state, action.payload);

        // },
        // todoAllUnComplete: (state, action) => {
        //     const update_arr = state.ids.map((id) => {
        //         return {id: id, changes: {complete: false}}
        //     })
        //     todoAdapter.updateMany(state, update_arr)
        // }
        
    },
    extraReducers: (builder) => {
        builder
        .addCase(fetchTodos.fulfilled, todoAdapter.setAll)
        .addCase(todoAdd.fulfilled, (state, action) => {
            todoAdapter.addOne(state,action.payload)
        })
        .addCase(todoDelete.fulfilled, (state, action) => {
            state.open = true;
            todoAdapter.removeOne(state,action.payload);
            
            
        })
        .addCase(todoComplete.fulfilled, todoAdapter.updateOne)
        .addCase(todoAllComplete.fulfilled, (state, action) => {
            const update_arr = state.ids.map((id) => {
                return {id: id, changes: {completed: true}}
            })
            todoAdapter.updateMany(state, update_arr)
        })
        .addCase(todoAllUnComplete.fulfilled, (state, action) => {
            const update_arr = state.ids.map((id) => {
                return {id: id, changes: {completed: false}}
            })
            todoAdapter.updateMany(state, update_arr)
        })
        .addCase(todoClearComplete.fulfilled, (state, action) =>{
            const completeTodoArray = Object.values(state.entities).filter((todo) => todo.completed);
            const completeIds = completeTodoArray.map(todo => todo._id);
            todoAdapter.removeMany(state, completeIds);
        } )
        .addCase(todoSelect.fulfilled, todoAdapter.updateOne)

    }
})



export const { todoDeleteSnack } = todoSlice.actions;

export default todoSlice.reducer;


export const { selectAll, selectById } = todoAdapter.getSelectors((state) => state.todos);


export const selectFilterIds = createSelector(
    (state) => state,
    (state) =>{
        if(state.filters.status === "All" && state.filters.colors.length === 0) {
            return selectTodoIds(state)
        } else if(state.filters.status === "UnComplete"){
           const arr = selectAll(state).filter((item) => !item.completed && (state.filters.colors.length=== 0 || state.filters.colors.includes(item.color)));
           return arr.map((item) => item._id)
        } else if(state.filters.status === "Complete"){
           const arr = selectAll(state).filter((item) => item.completed && (state.filters.colors.length=== 0 || state.filters.colors.includes(item.color)));
           return arr.map((item) => item._id)
        } else {
            const arr = selectAll(state).filter((item) => state.filters.colors.includes(item.color));
            return arr.map((item) => item._id)
        }
    }
)

export const selectTodoIds = createSelector(
    selectAll,
    (state) => state.map((item) => item._id)

)

export const selectUnComplete = createSelector(
    selectAll,
    (state) => state.filter((state) => !state.completed)
)

// export const selectTodoDeleteSnack = createSelector(
//     (state) => state.todos,
//     state => state.open
//  )

export const selectTodoDeleteSnack = (state) => state.todos.open;