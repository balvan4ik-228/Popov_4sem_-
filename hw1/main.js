function inverse(arr, num) {
    if (!Array.isArray(arr)) return [];

    // Если второй аргумент не передан — просто переворачиваем весь массив
    if (num === undefined) {
        return arr.reverse();
    }

    // Если число положительное — оставляем первые num элементов на месте,
    // остальные переворачиваем
    if (num > 0) {
        const firstPart = arr.slice(0, num);
        const rest = arr.slice(num);
        return firstPart.concat(rest.reverse());
    }

    // Если число отрицательное — оставляем последние |num| элементов на месте
    if (num < 0) {
        const keepCount = Math.abs(num);
        const keepLast = arr.slice(-keepCount);
        const firstPart = arr.slice(0, -keepCount);
        return firstPart.reverse().concat(keepLast);
    }

    // Если num === 0 — всё переворачиваем
    return arr.slice().reverse();
}

console.log(inverse([1, 2, 3, 4, 5]));
