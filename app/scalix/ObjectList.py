class Test_m(object):
    def __init__(self, ll):
        self._item = ll

    @property
    def name(self):
        return str(self._item) + 'test'

    @property
    def prop(self):
        ret = []
        for a in range(5):
            ret.append(str(self._item) + 'Proper#' + str(a))
        return ret

    @property
    def sub_menu(self):
        pass
