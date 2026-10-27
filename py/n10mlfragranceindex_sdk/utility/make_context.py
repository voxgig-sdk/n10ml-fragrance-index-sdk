# N10mlFragranceIndex SDK utility: make_context

from n10mlfragranceindex_sdk.core.context import N10mlFragranceIndexContext


def make_context_util(ctxmap, basectx):
    return N10mlFragranceIndexContext(ctxmap, basectx)
