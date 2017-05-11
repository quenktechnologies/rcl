import { Functor } from 'afpl/data/Functor';

interface Future<A> extends Functor<A> {

    fork<B, C>(l: (e: Error) => B, r: (a: A) => C);

}
