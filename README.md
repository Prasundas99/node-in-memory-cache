# js-cache
js-cache is a lightweight Node.js package that provides a Redis-like caching system, offering persistent key-value storage with optional expiration times. It simplifies the management of strings, lists, sets, and hashes, all stored persistently on disk.

# Features
- String Operations: Set and retrieve string values with optional expiration times.
- List Operations: Push and pop elements from lists at the front or back.
- Set Operations: Add, remove, and list members of sets.
- Hash Operations: Store, retrieve, and delete fields within hashes.
- Persistent Storage: Automatically saves data to disk for durability across sessions.
- Expiration: Supports setting expiration times for keys.

## Installation
Install via npm:

```
npm install js-cache
```

## Usage

### String Operations
#### SET_STRING
Sets a string value with an optional expiration time.

```
jsCache.set_string('key1', 'value1', '60'); // Set 'key1' with value 'value1' and expiration time of 60 seconds
```

#### GET_STRING
Retrieves a string value based on the key.

```
const value = jsCache.get_string('key1'); // Retrieve value of 'key1'
console.log(value); // Outputs: 'value1' or 'nil' if expired or not found
```

### List Operations

#### LIST_PUSH_FRONT
Pushes an element to the front of a list.

```
jsCache.list_push_front('myList', 'value2'); // Push 'value2' to the front of 'myList'
```

#### LIST_PUSH_BACK
Pushes an element to the back of a list.

```
jsCache.list_push_back('myList', 'value3'); // Push 'value3' to the back of 'myList'
```

#### LIST_POP_FRONT
Pops an element from the front of a list.

```
const poppedValue = jsCache.list_pop_front('myList'); // Pop from the front of 'myList'
console.log(poppedValue); // Outputs: 'value2' or 'nil' if list is empty
```

#### LIST_POP_BACK
Pops an element from the back of a list.

```
const poppedValue = jsCache.list_pop_back('myList'); // Pop from the back of 'myList'
console.log(poppedValue); // Outputs: 'value3' or 'nil' if list is empty
```

### Set Operations

#### SET_ADD
Adds an element to a set.

```
jsCache.set_add('mySet', 'value4'); // Add 'value4' to 'mySet'
```

#### SET_REMOVE
Removes an element from a set.

```
jsCache.set_remove('mySet', 'value4'); // Remove 'value4' from 'mySet'
```

#### SET_MEMBERS
Retrieves all members of a set.

```
const setMembers = jsCache.set_members('mySet'); // Retrieve members of 'mySet'
console.log(setMembers);
```

### Hash Operations

#### HASH_SET_FIELD
Sets a field within a hash.

```
jsCache.hash_set_field('myHash', 'field1', 'value5'); // Set 'field1' with 'value5' in 'myHash'
```

#### HASH_GET_FIELD
Retrieves the value of a field within a hash.

```
const hashValue = jsCache.hash_get_field('myHash', 'field1'); // Retrieve value of 'field1' in 'myHash'
console.log(hashValue);
```

#### HASH_DELETE_FIELD
Deletes a field from a hash.

```
jsCache.hash_delete_field('myHash', 'field1'); // Delete 'field1' from 'myHash'
```

#### HASH_GET_ALL
Retrieves all fields and values from a hash.

```
const allFields = jsCache.hash_get_all('myHash'); // Retrieve all fields and values from 'myHash'
console.log(allFields);
```


## Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

