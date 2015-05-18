import config as CONFIG


class ObjectList(object):

    def __init__(self):
        pass

    def name_list(self):
        pass
        


class Test_m(object):
    def __init__(self, ll):
        self._item = ll
        print(CONFIG.SERVER)

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
