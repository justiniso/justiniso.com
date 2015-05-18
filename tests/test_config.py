import os
import unittest


class TestConfig(unittest.TestCase):

    def test_get_default(self):
        """Tests that the default config is loaded with default values"""

        os.environ['CONFIG_FILE'] = '/fake/path'

        from conf import config

        self.assertEqual('127.0.0.1', config.get('app', 'address'))
        self.assertEqual('8080', config.get('app', 'port'))