function minWalk(gridList, startX, startY, endX, endY) {
    // TODO
    // Использую алгоритм A*
      // Судя по условию задачи, кооридана X отвечает за вертикалаль, а Y - за горизонталь.
    
    // Создать класс карты
    class PathfinderMap {
        
      // Свойства
      gridMap = []
      
      constructor(gridList, startX, startY, endX, endY){
              this.gridList = gridList
        this.startX = startX
        this.startY = startY
        this.endX = endX
        this.endY = endY
        this.path = []
      }
     
      // Выгрузить карту
      get gridMap() {
          return [...this.gridMap]
      }
      
      // *** Методы ***
    
      // Создать массив ячеек с параметрами - карта
      createGridMap() {
          
        // Преобразование списка в карту
        this.gridList.map( 
  
          // Для каждой строки
          ( row, stringIndex ) => {
  
            this.gridMap[stringIndex] = []
  
                       // Для каждого знака
                      this.gridList[stringIndex].split("").map( ( sign, signIndex ) => {
                
                // Создаём объект ячейки с нужными параметрами
              this.gridMap[stringIndex][signIndex] = {
  
                // Коориданты (для наглядности)
                nextX: stringIndex,
                nextY: signIndex, 
  
                // Расстояние по кратчайшему пути от данной ячейки до конечной
                distanceToEnd: null,
  
                // Расстояние пройденное от начальной ячейки до данной ячейки
                movedDistance: null,
  
                // Веса (значение для алгоритма), определяет очередь ячейки для перебора движения
                weight: null,
  
                // Ячейка, с которой прошло движение в данную
                movedFrom: null,
  
                // Признак того, был ли произведён расчёт движения из данной ячейки (для предотвращения повторных расчётов)
                isAlreadyMovedFrom: false,
  
                // Доступность данной ячейки
                value: this.gridList[stringIndex][signIndex]
              }
              
            })
          }
        )
      }
      
      // Проверить параметры карты на корректность
      checkGridMap() {
          
        // Инициировать результат
        let result = {
          isRight: true,
          message: ''
        }
        
        // Проверить координаты начальной ячейки по вертикали - не меньше 0
        if (this.startX < 0 ) {
            
          result.isRight = false
          result.message = 'Ошибка: первая координата начальной ячейки меньше 0.'
  
          return result
          
        }
        
        // Проверить координаты начальной ячейки по вертикали - не больше максимального значения
        if (this.startX > this.gridList.length - 1 ) {
            
          result.isRight = false
          result.message = 'Ошибка: первая координата начальной ячейки больше ' + (this.gridList.length - 1) + '. Координата выходит за пределы карты.'
                  
          return result
          
        }
        
        // Проверить координаты начальной ячейки по горизонали - не меньше 0
        if (this.startY < 0 ) {
            
          result.isRight = false
          result.message = 'Ошибка: вторая координата начальной ячейки меньше 0.'
  
          return result
          
        }
        
        // Проверить координаты начальной ячейки по горизонтали - не больше максимального значения
        if (this.startY > this.gridList[0].length - 1 ) {
            
          result.isRight = false
          result.message = 'Ошибка: вторая координата начальной ячейки больше ' + (this.gridList[0].length - 1) + '. Координата выходит за пределы карты.'
                  
          return result
          
        }
        
        // Проверить стартовую ячейку на доступность
        if (this.gridList[this.startX][this.startY] === 'X') {
                  
          result.isRight = false
          result.message = 'Стартовая ячейка заблокирована. Измените координаты или сделайте её доступной.'
                  
          return result
        }
        
        // Проверить координаты конечной ячейки по вертикали - не меньше 0
        if (this.endX < 0 ) {
            
          result.isRight = false
          result.message = 'Ошибка: первая координата конечной ячейки меньше 0.'
  
          return result
          
        }
        
        // Проверить координаты конечной ячейки по вертикали - не больше максимального значения
        if (this.endX > this.gridList.length - 1 ) {
            
          result.isRight = false
          result.message = 'Ошибка: первая координата конечной ячейки больше ' + (this.gridList.length - 1) + '. Координата выходит за пределы карты.'
                  
          return result
          
        }
        
        // Проверить координаты конечной ячейки по горизонали - не меньше 0
        if (this.endY < 0 ) {
            
          result.isRight = false
          result.message = 'Ошибка: вторая координата начальной ячейки меньше 0.'
  
          return result
          
        }
        
        // Проверить координаты начальной ячейки по горизонтали - не больше максимального значения
        if (this.endY > this.gridList[0].length - 1 ) {
            
          result.isRight = false
          result.message = 'Ошибка: вторая координата начальной ячейки больше ' + (this.gridList[0].length - 1) + '. Координата выходит за пределы карты.'
                  
          return result
          
        }
           
        //  Проверить конечную ячейку на доступность
        if (this.gridList[this.endX][this.endY] === 'X') {
  
          result.isRight = false
          result.message = 'Конечная ячейка заблокирована. Измените координаты или сделайте её доступной.'
  
          return result
        }
  
        // Если все проверки пройдены
        return result
  
      }
      
      // Функция рисует карту
      paintMap() {
  
        // Строка, отображающая карту
        let resultString = ""
  
        // Для каждой колонки
        this.gridMap.map( ( row, rowIndex ) => {
  
          // Для каждого ряда
          row.map( ( column, columnIndex ) => {
  
            // Если ячейка - начало пути - "S"
            if ( rowIndex === this.startX && columnIndex === this.startY) {
              resultString += 'S'
              return
            }
  
            // Если ячейка - конец пути - "E"
            if ( rowIndex === this.endX && columnIndex === this.endY) {
              resultString += 'E'
              return
            } 
  
            // Если ячейка доступна - ".", если ячейка - преграда - "X"
            resultString += this.gridMap[rowIndex][columnIndex].value
  
          })
  
          // Перенос с пробелом
          resultString += `\n `
  
        })
  
        return resultString
  
      }
      
      // Найти путь
      findPath() {
          
         // ***** Константы *****
               // При движении по диагонали берём значение дистанции согласно теореме Пифагора - приблизительно 1.4 (корень из двух).
            const DIAGONAL_STEP_DISTANCE = 1.4
          
        
          // Округление до десятых
        const roundToDecimal = value => {
          return Math.round( value * 10 ) / 10
        }
  
              // ***** Вспомогательные функции *****
  
        // Функция расчитывает растояние от текущей ячейки до конечной
        const calculateDistanceToEnd = ( currentX, currentY ) => {
  
          // Вычислим разницы координат по модулю
          let dX = Math.abs( currentX - this.endX )
          let dY = Math.abs( currentY - this.endY )
  
          // Сперва двигаемя по диагонале до того момента, пока одна из координат (горизонтальная или вертикальная) конечной ячейки не будет достигнута. 
          let distanceByDiagonal = Math.min( dX, dY ) * DIAGONAL_STEP_DISTANCE
  
          // Далее - движенние вдоль одной из кординат
          let distanceByStrict = Math.max( dX, dY ) - Math.min( dX, dY )
  
          // Суммируя движение по диагонале и по одной из осей получаем конечное значение
          return roundToDecimal(distanceByDiagonal + distanceByStrict)
        }
        
        // ***** Основные рассчёты *****
        
        // Функция редактирует массив ячеек карты, указывая характеристики движения по ним от текущих координат
        const calculateMoves = ( currentX, currentY) => {
  
          // Движение по вертикали
          for (let dX = -1; dX <=1; dX++) {
  
            // Вычислим координаты ячейки в которую пробуем переместиться	по вертикали
            let nextX = currentX + dX
  
            // Движение по горизонтали
            for (let dY = -1; dY <= 1; dY++) {
  
              // Вычислим координаты ячейки в которую пробуем переместиться	по горизонтали
              let nextY = currentY + dY
  
              // При совпадении координат с начальной - меняем лишь признак того, что из данной ячейки производилось движение
              if ( dX === 0 && dY === 0) {
  
                  this.gridMap[nextX][nextY] = { ...this.gridMap[nextX][nextY] ,
                    isAlreadyMovedFrom: true
                  }
  
              } else {
                // Проверить ячейку на доступность: координаты не выходят за пределы поля, ячейка не является препятствием и из неё уже не производилось движение или уже не производился расчёт
                if ( 
                     0 <= nextX && nextX <= this.gridMap.length - 1 
                  && 0 <= nextY && nextY <= this.gridMap[nextX].length - 1
                  && this.gridMap[nextX][nextY].value === '.'
                  && this.gridMap[nextX][nextY].isAlreadyMovedFrom === false
                ) {
  
                  // Вычисляем кратчайшее расстояние от ячейки, в которую переместимся и до конечной ячейки
                  let distanceToEnd = calculateDistanceToEnd( nextX, nextY )
                                  
                  // Вычислим пройденый путь
                  let movedDistance = this.gridMap[currentX][currentY].movedDistance + ( (dX === 0 || dY === 0) ? 1 : DIAGONAL_STEP_DISTANCE )
                  movedDistance = roundToDecimal(movedDistance)
  
                  // Если новый шаг более короткий или если значение не вычислено
                  if ( movedDistance < this.gridMap[nextX][nextY].movedDistance || this.gridMap[nextX][nextY].movedDistance === null ) {
  
                    // Меняем параметры ячейки в карте
                    this.gridMap[nextX][nextY] = { ...this.gridMap[nextX][nextY] ,
                      distanceToEnd,
                      movedDistance,
                      weight: roundToDecimal(distanceToEnd + movedDistance),
                      movedFrom: [ currentX, currentY ]
                    }
  
                  }
                }
              }
            }
          }
        } // calculateMoves
        
        // Функция проверяет, есть ли ячейки с весом, от которых ещё не происходило движение
        const checkIsWayOut = () => {
  
          // Нет доступных ячеек по умолчанию
          let isWayOut = false
  
          // В каждом ряду карты
          this.gridMap.map( row => {
  
            // В каждой ячейке строки
            row.map( cell => {
  
              // Если имеются веса и ход из ячейки не был произведён - выход есть
              if (cell.weight !== null && cell.isAlreadyMovedFrom === false) {
                isWayOut = true
  
                // Остановка перебора по ячейке
                return
              }
  
            })
  
            // Остановка перебора по колонке
            if (isWayOut === true)  return
  
          })
  
          return isWayOut
  
        } // checkIsWayOut
        
        // Найти оптимальную ячейку для следующего хода
        const getNextCell = () => {
  
          let currentOptimalCell = null
  
          // В каждой строке карты
          this.gridMap.map( (row, rowIndex) => {
  
            // В каждой ячейке колонки
            row.map( (cell, colunnIndex) => {
  
              // Если имеются веса и ход из ячейки не был произведён
              if (cell.weight !== null && cell.isAlreadyMovedFrom === false) {
  
                // Если оптимальная ячейка не была выбрана
                if (currentOptimalCell === null) {
  
                  // Берём текущую ячейку
                  currentOptimalCell = { ...this.gridMap[rowIndex][colunnIndex] }
  
                // Если оптимальная ячейка была выбрана
                } else {
  
                  // Сравниваем веса текущей и уже выбранной ячейки
                  // Если вес текущей ячейки меньше - выбираем её
                  if ( currentOptimalCell.weight > this.gridMap[rowIndex][colunnIndex].weight ) {
  
                    currentOptimalCell = { ...this.gridMap[rowIndex][colunnIndex] }
  
                  // Если веса у ячеек одинаковые - сравниваме расстояние до конца пути
                  } else if ( currentOptimalCell.weight === this.gridMap[rowIndex][colunnIndex].weight ) {
  
                    // Если расстояние до конца пути у текущей ячейки меньше - выбираем её
                    if ( currentOptimalCell.distanceToEnd > this.gridMap[rowIndex][colunnIndex].distanceToEnd ) {
  
                      currentOptimalCell = { ...this.gridMap[rowIndex][colunnIndex] }
                    }
                  }
                }
              }
            })
          })
  
          return currentOptimalCell
  
        } // getNextCell
        
        // Расчёт шагов - повторять пока не окажется выхода или пока не достигнут конец пути
        let x = startX
        let y = startY
        let runNext = false
        let isWayOut
        let nextCell = {}
              
        do {
                  
          // Рассчитать возможные варианты для хода
          calculateMoves( x, y )
                  
          // Определить оптимальную ячейку для следующего хода
          nextCell = getNextCell()
  
          // Если нет выхода на карте - выводим сообщение
         if ( !checkIsWayOut() ) return 'Нет возможности добраться до цели.'
  
          // Задать координаты для следующего шага
          x = nextCell.nextX
          y = nextCell.nextY
  
          // Определить, стоит ли ходить далее: есть ли выход или не достигнут ли конец пути
          runNext = checkIsWayOut() === true && ( this.endX !== x || this.endY !== y ) 
  
        // Расчёт шагов - повторять пока не окажется выхода или пока не достигнут конец пути
        } while ( runNext )
  
  
        // Определить путь
        let pathArray = []
        let previousX = 0
        let previousY = 0
        let isRun
        let i = 0
  
        // Добавим конечную ячейку в массив ячеек пути 
        pathArray.unshift( this.gridMap[endX][endY] )
  
        // Испольсуем переменные для перебора в цикле (объявлены выше)
        x = endX
        y = endY
  
        // Добавляем ячейки по мере ссылок на предыдущую в пути
        do {
  
          // Определеяем координаты предыдущей ячейки
          previousX = this.gridMap[x][y].movedFrom[0]
          previousY = this.gridMap[x][y].movedFrom[1]
  
          // Добавляем ячейку в массив пути
          pathArray.unshift( this.gridMap[previousX][previousY] )
  
          // Переходим к координатам следующей ячейки
          x = previousX
          y = previousY
  
          // Определяем являются ли координаты предыдущей ячейки координатами стартовой ячейки
          isRun = previousX !== startX || previousY !== startY
  
        // Повторять, пока не доберёмся до стартовой ячейки
        } while ( isRun )
        
        // Пометить ячейки пути как '*' и сохранить
        pathArray.map( cell => {
            this.gridMap[cell.nextX][cell.nextY].value = '*'
        })
  
        // Преобразуем полученный масив клеток в строку с описанием пути
        let result
  
        // Укажем количество шагов
        result = `Необходимое количество шагов - ${pathArray.length - 1}. Путь: `  
  
        // Укажем путь
        result += pathArray.map( (cell) => {
          return `(${cell.nextX}, ${cell.nextY})`
        }).join(' -> ')
  
        return result
  
      } // findPath
      
    } // Создать класс карты - class PathfinderMap
    
    
    
    // Создаём карту
    let newMap = new PathfinderMap(gridList, startX, startY, endX, endY)
    
    // Проверяем корректность начала и конца пути
    let isRight = newMap.checkGridMap()
    if ( isRight.isRight === false ) return isRight.message
    
    // Создаём массив с параметрами
    newMap.createGridMap()
    
    // Найти путь
    let path = newMap.findPath()
    
    // Нарисовать путь и карту
    console.log(newMap.paintMap())
    console.log(path)
    
    return path
    
  }
  
  // Используем функцию
  const result = minWalk(
    [
      '.......',
      '.XXXXX.',
      '.X..X.X',
      '..X.X..',
    ],
    3, 3,
    3, 6
  );
  
 document.getElementById('result').innerHTML = result;
  