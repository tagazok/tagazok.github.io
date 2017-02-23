import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// Component transition animations
export const slideInDownAnimation: AnimationEntryMetadata =
  // trigger('routeAnimation', [
  //   state('*',
  //     style({
  //       opacity: 1,
  //       transform: 'translateX(0)'
  //     })
  //   ),
  //   transition(':enter', [
  //     style({
  //       opacity: 0,
  //       transform: 'translateX(-100%)'
  //     }),
  //     animate('0.2s ease-in')
  //   ]),
  //   transition(':leave', [
  //     animate('0.5s ease-out', style({
  //       opacity: 0,
  //       transform: 'translateY(100%)'
  //     }))
  //   ])
  // ]);
  trigger('routeAnimation', [
    // state('void', 
    //   style({
    //     position:'fixed',
    //     width:'100%',
    //     height:'100%'
    //   })
    // ),
    // state('*',
    //   style({
    //     position:'fixed',
    //     width:'100%',
    //     height:'100%'
    //   })
    // ),
    transition(':enter', [
      style({
        transform: 'translateY(100%)'
      }),
      animate('0.5s ease-in-out',
        style({transform: 'translateY(0%)'
      })
    )
  ]),
  transition(':leave', [
    style({
      transform: 'translateY(0%)'
    }),
    animate('0.5s ease-in-out', style({
      transform: 'translateY(-100%)'
    }))
  ])
]);
