---
title: '3 formas de obtener el último elemento de un array'
description: 'Este post explica las diferentes formas de obtener el último elemento de un array en JavaScript.'
publishDate: '17 Nov 2024'
updatedDate: '17 Nov 2024'
tags: ['JavaScript', 'Arrays']
---

## Obtener el último elemento de un array en JavaScript

En JavaScript, hay varias formas de obtener el último elemento de un array. A continuación, te mostramos algunas de las más comunes.

### Usando la propiedad `length`

La forma más común hasta ahora de obtener el último elemento de un array es utilizando la propiedad `length` del array. La propiedad `length` nos da el número de elementos en el array, y podemos usarla para acceder al último elemento restando uno.

```javascript
const array = [1, 2, 3, 4, 5]
const lastElement = array[array.length - 1]
console.log(lastElement) // 5
```

### Usando el método `findLast`

Otra forma muy interesante de obtener el último elemento de un array es utilizando el método finLast de los arrays, este método transforma el array en orden de reversa y retorna el elemento según la condición.

```javascript
const array = [1, 2, 3, 4, 5]
const lastElement = array.findLast((element) => element)
console.log(lastElement) // 5
```

### Usando el método `at()`, mi forma favorita 😀

Una de las formas más pro y actualizadas es utilizando el método `at()`, este método recibe como parámetro el índice y te devolverá el elemento correspondiente, para obtener el último solo le pasamos `-1` 🪄.

```javascript
const array = [1, 2, 3, 4, 5]
const lastElement = array.at(-1)
console.log(lastElement) // 5
```
