import * as React from "react";

// 1. Тип функции, конкатенирующей две строки

function concat (left: string, right: string): string {
    return left + right;
  }

type ConcatFunction = (left: string, right: string) => string;

type ConcatFunctionAlternating = (...args: string[]) => string;

const concatAlternating: ConcatFunctionAlternating = (...args: string[]) => {
  return args.join('');
}
  
  // 2. Интерфейс для описания следующих данных:
  //  const MyHometask = {
  //   howIDoIt: "I Do It Wel",
  //   simeArray: ["string one", "string two", 42],
  //   withData: [
  //     {
  //       howIDoIt: "I Do It Wel",
  //       simeArray: ["string one", 23],
  //     }]
  // }
  
  // type alias:
  type StrOrNumber = string | number;
  
  // Simple object:
  interface ISimpleObj {
    howIDoIt: string;
    simeArray: Array<StrOrNumber>;
  }
  
  // Object IObj:
  interface IObj {
    howIDoIt: string;
    simeArray: Array<StrOrNumber>;
    withData?: Array<ISimpleObj>;
  }

  // Object IHometask:
  interface IHometask {
    howIDoIt: string;
    simeArray: Array<StrOrNumber>;
    withData: Array<IObj>;
  }
  
  // 3. Добавьте типизацию для метода reduce:
  // interface MyArray<T> {
  //   [N: number]: T;
  //   reduce();
  // }
  // const initialValue = 0;
  // [1,2,3].reduce((accumulator, value) => accumulator + value, initialValue); // -> 6
  
  interface MyArray<U> {
      [N: number]: U;
      reduce<T>(fn: (accumulator: T, value: U) => T): T;
  }
  
  const initialValue = 0;
  ['1','2','3'].reduce<number>((accumulator, value) => accumulator + value.length, initialValue);

// 4.  Работа с MappedTypes
// interface IHomeTask {
//   data: string;
//   numbericData: number;
//   date: Date;
//   externalData: {
//     basis: number;
//     value: string;
//   }
// }
// Стандартный generic Partial работает так же как Readonly, только для внешних ключей.
// Напишите такой MyPartial, чтобы создание подобного объекта стало возможным
// const homeTask: MyPartial<IHomeTask> = {
//   externalData: {
//     value: 'win'
//   }
// }

type MyPartial<T> = {
  [N in keyof T]?: T[N] extends object ? MyPartial<T[N]> : T[N];
};


  // 5. Работа с Generic, Mapped Types, Type inference №1
// Это React Functional Component 
// function HomeComponent(props: { firstProp: string }) {
//   return (
//     <div>
//       { props.firstProp }
//     </div>
//   )
// }
// Напишите такой тип, который извлечет тип props из этого или любого другого React компонента.
// Подсказка: любой реакт компонент расширяет React.ComponentType<Props>
// props: IProps;
// interface IProps {
//   firstProp: string
// }
// const t = TMyType<typeof HomeComponent>;

type FnParameters<T> = T extends (( ...args: infer R) => any) ? R : never;

function HomeComponent(props: { firstProp: string }) {
  return (
    <div>
      { props.firstProp }
    </div>
  )
}

type TMyType = FnParameters<typeof HomeComponent>;

// 6. Работа с Generic, Mapped Types, Type inference №2
// Дан namespace JSX. Получить к нему доступ можно после установки пакета @types/react.
// Мы проделывали это в одном из первых уроков.
// Среди JSX IntrinsicElements есть Элемент DIV, получить доступ к нему можно так: 
// type TDivElement = JSX.IntrinsicElements['div'];
// Этот тип описывает все свойства, доступные для HTMLDivElement. 
// Напишите такой тип TGetJSXPropsProp, который извлекает все HTML свойства,
// доступные для любого jsx элемента.
// Пример:
// type TDivProps = TGetJSXPropsProp<'div'>
// const props: TDivProps = {
//   some: '1233' // throw error потому что не содержится в атрибутах div
//   className: 'handler' // не выкидывает ошибку так как валидно для div элемента
// }

type TGetHTMLObject<T extends keyof JSX.IntrinsicElements> = {
  [N in T]: JSX.IntrinsicElements[T];
}



type TDivElement1 = TGetHTMLObject<'div'>;
const props1: TDivElement1 = {
  div: {}
}

props1.div.className = 'handler';

type TDivElement = JSX.IntrinsicElements['div'];
const props: TDivElement = {
  className: 'handler'
}