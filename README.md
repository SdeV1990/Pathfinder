# Тестовое задание

## Описание
    Вам дается квадратная сетка с обычными `.` и заблокированными `X` ячейками. 
    Ваша игровая фигура может перемещаться по любой строке или столбцу или диагонали, пока не достигнет края сетки или заблокированной ячейки. 
    Учитывая сетку, начальную и конечную позиции, определите количество ходов, чтобы добраться до конечной позиции.

## Например
    Дана сетка:
    .X.
    .X.
    ...
    
    Система координаты для данной сетки:
    0.0 0.1 0.2
    1.0 1.1	1.2
    2.0	2.1	2.2

    Начальна позиция 2.1 (отсчет идет с верхнего левого края сетки 0.0)
    Конечная позиция 0.2
      
    Путь движения между точками: (2.1) -> (1.2) -> (0.2)
    Ответ: необходимо выполнить 2 шага.

## Задача
    Завершите выполнение функции в редакторе. Функция должена вывести целое число, обозначающее минимальное количество шагов для перехода от начальной позиции к конечной.
    
## Ограничения
    Длина сетки > 1 и < 100
    Координата начальной и конечной точки входит в предоставленную сетку.

## Примечание

    Выполнял тут: https://jsfiddle.net/denis_pochepynets/hob426jt/159/

    Здесь просто сохранил.