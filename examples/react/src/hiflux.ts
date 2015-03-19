/// <reference path="../../../loflux/src/locker.ts" />
/// <reference path="../../../loflux/src/round.ts" />
/// <reference path="../../../utils/src/delegate.ts" />

module LoFlux {

    /**
     * An example HiFlux - that is a higher level API over LoFlux, and other libraries/utilities
     */
    export interface HiFlux<S> {
        addSideEffect(sideEffect: Spectator<S>);
        createAction(player: Player<S>): Round;
    }

    export function create<S>(initialState: S): HiFlux<S> {
        var locker = createLocker(Utils.deepFreeze(initialState));
        var sideEffects:Spectator<S>[] = [];

        function spectator(newState:S, oldState:S) {
            Utils.delegate(sideEffects)(newState, oldState);
        }

        return {
            addSideEffect(sideEffect: Spectator<S>) {
                sideEffects.push(sideEffect);
                return this;
            },

            createAction(player: Player<S>) {
                return LoFlux.round(locker, spectator, player);
            }
        }
    }
}
